import { executeQuery } from '../../../../../../includes/db';

export default function blockList(req, res) {
    if (req.query.accountId) {
        executeQuery('SELECT blockList FROM users WHERE username = ?', [req.query.accountId]).then(blockList => {
            res.json(
                {
                    "blockedUsers": JSON.parse(blockList[0].blockList)
                }
            );
        });
    } else {
        res.status(400).json({
            status: "error",
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}