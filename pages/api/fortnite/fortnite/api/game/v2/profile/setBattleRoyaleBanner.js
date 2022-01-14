// ! Remove when in production
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function setBattleRoyaleBanner(req, res) {
    if (req.query.profileId === "athena") {
        res.json(await (await fetch(`https://localhost:8443/equip_banner?payload=${encodeURIComponent(JSON.stringify(req.query))}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        })).json());
    }
}