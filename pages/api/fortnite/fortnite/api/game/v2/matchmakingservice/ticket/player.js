import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function player(req) {
    return edgeResponse({
        serviceUrl: "wss://matchmaker.yeetnite.ml",
        ticketType: "mms-player",
        payload: "1=",
        signature: "2=",
    });
}