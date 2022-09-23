import storefrontCatalog from './catalog.json';
import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function catalog() {
    return edgeResponse(storefrontCatalog);
}