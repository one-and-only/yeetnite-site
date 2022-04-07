import { randomBytes } from 'crypto';
import { prisma } from '@lib/prisma';
import { } from 'dotenv/config';

export default async function processUserRequest(req, res) {
    if (req.method === "POST") {
        // sanity check
        if (!req.body.username || !req.body.email || !req.body.password) {
            res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
            return;
        }

        // check for duplicates
        if (await prisma.users.findFirst({
            where: {
                OR: [{ username: req.body.username }, { email: req.body.email }]
            }
        })) {
            res.status(400).json({
                success: false,
                reason: "Username or Email Address Already Exists"
            });
            return;
        }

        // create user
        await prisma.users.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        });

        const user = await prisma.users.findFirst({
            select: {
                user_id: true
            },
            where: {
                username: req.body.username
            }
        });

        await prisma.locker.create({
            data: {
                user_id: user.user_id
            }
        });

        // generate the user's access token
        let newToken = randomBytes(8).toString("hex");
        const accessTokens = await prisma.users.findMany({
            select: {
                accessToken: true
            }
        });

        // make sure we have a unique token
        while (accessTokens.filter(user => user.accessToken == newToken).length > 0) {
            newToken = randomBytes(8).toString("hex");
        }

        await prisma.users.update({
            data: {
                accessToken: newToken
            },
            where: {
                user_id: user.user_id
            }
        });

        // Create user on XMPP server
        await fetch(`https://xmpp.yeetnite.ml:1443/rest/user/${req.body.username}@xmpp.yeetnite.ml?api-key=${process.env.TIGASE_API_KEY}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    password: newToken,
                    email: req.body.email
                }
            })
        });

        res.json({
            success: true,
            user: { username: req.body.username }
        });
    } else if (req.method === "GET") {
        // sanity check
        if (!req.query.username || !req.query.password) {
            res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
            return;
        }

        // get username's password
        const userInfo = await prisma.users.findFirst({
            select: {
                password: true
            },
            where: {
                username: req.query.username
            }
        });

        // check if the password is valid
        if (userInfo?.password === req.query.password)
            res.json({
                success: true,
                user: { username: req.query.username }
            });
        else
            res.json({
                success: false,
                reason: "Invalid username or password"
            });
    } else {
        res.json({ success: false, reason: "Invalid HTTP Method" });
    }
}