import { prisma } from '@lib/prisma';

export default async function launcherLogin(req, res) {
    // sanity check
    if (!req.query.username || !req.query.password) {
        res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
        return;
    }

    // get username's password
    const userInfo = await prisma.users.findFirst({
        select: {
            password: true,
            accessToken: true,
        },
        where: {
            username: req.query.username
        }
    });

    // check if the password is valid
    if (userInfo?.password === req.query.password)
        res.json({
            success: true,
            username: req.query.username,
            accessToken: userInfo.accessToken,
        });
    else
        res.json({
            success: false,
            reason: "Invalid username or password"
        });
}