import timelineResponse from './timeline.json';
import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function timeline() {
    timelineResponse.currentTime = new Date().toISOString();
    return edgeResponse(timelineResponse);
}