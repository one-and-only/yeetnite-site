import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function externalAuth() {
    return edgeResponse([]);
}