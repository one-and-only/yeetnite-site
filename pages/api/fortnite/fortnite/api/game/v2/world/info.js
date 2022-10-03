import worldInfoJson from './world.json'; // 1.8.2
import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function worldInfo(req, res) {
    return edgeResponse(worldInfoJson);
}