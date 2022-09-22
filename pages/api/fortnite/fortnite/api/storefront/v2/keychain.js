import keychainResponse from './keychain.json';

export const config = {
    runtime: 'experimental-edge',
}

export default function keychain(req, res) {
    if (req.query.rvn) {
        res.json(keychainResponse);
    } else {
        res.status(400).json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}