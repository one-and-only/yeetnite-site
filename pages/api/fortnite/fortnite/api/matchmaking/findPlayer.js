import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function findPlayer(req, res) {
    return edgeResponse(null, 200, {});
}