import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function waitingRoom() {
    return edgeResponse(null, 204, {});
}