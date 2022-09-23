import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function versionCheck() {
    return edgeResponse({
        "type": "NO_UPDATE"
    });
}