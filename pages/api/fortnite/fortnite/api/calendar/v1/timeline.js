export default function timeline(req, res) {
    let timelineResponse;
    switch (req.query.rvn) {
        case '498':
            timelineResponse = require('./timelines/1.8.2.json');
        default: // can't remember what the rvn was for 6.21, stay mad
            timelineResponse = require('./timelines/6.21.json');
    }
    timelineResponse.currentTime = new Date().toISOString();
    res.json(timelineResponse);
}