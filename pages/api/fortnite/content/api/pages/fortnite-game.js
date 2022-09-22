import content from './content.json';

export default function fortniteContent(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.json(content);
}