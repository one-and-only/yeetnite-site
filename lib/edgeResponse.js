export default function edgeResponse(response, returnCode = 200, headers = { "content-type": "application/json" }) {
    try {
        return new Response(headers["content-type"] === "application/json" ? JSON.stringify(response) : response, {
            status: returnCode,
            headers: headers
        });
    } catch (e) {
        console.log(e);
    }
}