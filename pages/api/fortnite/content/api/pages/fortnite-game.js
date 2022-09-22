import content from './content.json';

export const config = {
    runtime: 'experimental-edge',
}

export default function fortniteContent(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.json(content);
}