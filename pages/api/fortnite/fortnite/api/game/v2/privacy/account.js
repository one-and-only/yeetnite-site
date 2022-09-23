import edgeResponse from "@lib/edgeResponse";

export const config = {
    runtime: 'experimental-edge',
}

export default function account(req) {
    const { searchParams } = new URL(req.url);
    
    return edgeResponse({
        "accountId": searchParams.get("accountId"),
        "optOutOfPublicLeaderboards": false,
    });
}