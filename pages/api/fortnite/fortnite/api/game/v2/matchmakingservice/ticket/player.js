import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function player(req) {
    return edgeResponse({
        serviceUrl: "", // TODO find what this is supposed to be?
        ticketType: "mms-player",
        payload: "1=",
        signature: "2=",
    });
}