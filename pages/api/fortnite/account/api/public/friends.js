export default async function friends(req, res) {
    if (req.method === "POST") {
        await fetch('https://localhost:8443/friend_request', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.query)
        });
        res.status(204).send();
    } else if (req.method === "DELETE") {
        await fetch('https://localhost:8443/friend_request', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.query)
        });
        res.status(204).send();
    }
}
