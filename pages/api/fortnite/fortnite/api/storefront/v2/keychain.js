import keychainResponse from './keychain.json';
import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function keychain() {
    return edgeResponse(keychainResponse);
}