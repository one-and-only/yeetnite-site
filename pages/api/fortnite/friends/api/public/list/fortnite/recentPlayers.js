import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function recentPlayers() {
    return edgeResponse([]);
}