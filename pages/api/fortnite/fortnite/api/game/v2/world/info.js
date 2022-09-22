import worldInfoJson from './worlds/1.8.2.json';

export const config = {
    runtime: 'experimental-edge',
}

export default function worldInfo(req, res) {
    res.json(worldInfoJson);
}