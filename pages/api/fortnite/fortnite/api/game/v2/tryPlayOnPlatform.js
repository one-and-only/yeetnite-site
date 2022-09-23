import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function tryPlayOnPlatform() {
    return edgeResponse('true', 200, { 'content-type': 'text/plain' });
}