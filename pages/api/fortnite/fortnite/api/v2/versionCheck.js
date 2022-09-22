export const config = {
    runtime: 'experimental-edge',
}

export default function versionCheck(req, res) {
    res.json({
        "type": "NO_UPDATE"
    });
}