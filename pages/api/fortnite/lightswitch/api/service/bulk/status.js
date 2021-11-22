export default function status(req, res) {
    let statusResponse;
    switch (req.headers.useragent) {
        case 'game=Fortnite, engine=UE4, build=++Fortnite+Release-Cert-CL-3741772':
            statusResponse = require('./statuses/1.8.2.json');
            break;
        default:
            // too lazy to check 6.21 header, stay mad
            statusResponse = require('./statuses/6.21.json');
    }
    res.json(statusResponse);
}