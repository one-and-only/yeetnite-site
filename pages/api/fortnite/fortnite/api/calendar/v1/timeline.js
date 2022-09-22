import timelineResponse from './timeline.json';

export const config = {
    runtime: 'experimental-edge',
}

export default function timeline(req, res) {
    timelineResponse.currentTime = new Date().toISOString();
    res.json(timelineResponse);
}