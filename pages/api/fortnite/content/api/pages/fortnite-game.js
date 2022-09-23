import content from './content.json';
import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function fortniteContent() {
    return edgeResponse(content);
}