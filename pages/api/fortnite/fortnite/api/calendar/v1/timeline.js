// TODO change the season dynamically once we support more seasons
let timelineResponse = require('./timelines/s6.json');

export default function timeline(req, res) {
    // TODO change "currentTime" to current server time instead of hardcoded value
    timelineResponse.currentTime = new Date().toISOString();
    res.json(timelineResponse);
}