import { executeQuery } from '../../../../../../../includes/db';

// we need access to the raw ClientSettings.Sav data,
// so disable the body parser
export const config = {
    api: {
        bodyParser: false,
    },
}

export default function clientSettings(req, res) {
    if (req.query.accountId) {
        switch (req.method){
            case 'GET':
                res.json({
                    success: false,
                    reason: 'GET not supported yet', 
                });
                break;
            case 'PUT':
                return new Promise((resolve) => {
                    if (!req.body) {
                        let buffer = '';
                        req.on('data', (chunk) => {
                            buffer += chunk;
                        })
        
                        req.on('end', () => {
                            executeQuery('UPDATE users SET clientSettings = ? WHERE username = ?', [Buffer.from(buffer).toString(), req.query.accountId]);
                            res.status(204).send();
                            resolve(true);
                        })
                    }
                });
            default:
                res.json({
                    success: false,
                    reason: 'Method `' + req.method + '` not supported',
                });
        }
    } else {
        res.status(400).json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}