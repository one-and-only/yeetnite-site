import timelineResponse from './timeline.json';

export default function timeline(req, res) {
    timelineResponse.currentTime = new Date().toISOString();
    res.json(timelineResponse);
}