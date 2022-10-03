import timelineResponse from './timeline.json';
import edgeResponse from '@lib/edgeResponse';
import { getFortniteVersion } from '@lib/seasonUtils';

export const config = {
    runtime: 'experimental-edge',
}

export default function timeline(req) {
    const versionInfo = getFortniteVersion(req.headers.get('user-agent'));

    timelineResponse.currentTime = new Date().toISOString();
    timelineResponse.channels['client-events'].states[0].state.seasonNumber = versionInfo.season;
    timelineResponse.channels['client-events'].states[0].state.seasonTemplateId = `AthenaSeason:athenaseason${versionInfo.season}`;
    timelineResponse.channels['client-events'].states[0].activeEvents[0].eventType = `EventFlag.Season${versionInfo.season}`;
    timelineResponse.channels['client-events'].states[0].activeEvents[1].eventType = `EventFlag.${versionInfo.lobby}`;
    return edgeResponse(timelineResponse);
}