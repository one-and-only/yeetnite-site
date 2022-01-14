export default async function equipBattleRoyaleCustomization(req, res) {
    if (req.query.profileId === "athena") {
        res.json(await (await fetch(`https://${process.env.DBAPI_HOST}/locker_customization?payload=${encodeURIComponent(JSON.stringify(req.query))}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        })).json())
    } else {
        res.status(400).json({
            success: false,
            reason: `Invalid profileId: ${req.query.profileId}`,
        });
    }
}