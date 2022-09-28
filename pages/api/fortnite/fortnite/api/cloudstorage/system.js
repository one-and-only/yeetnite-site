import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function system() {
    return edgeResponse([
        {
            "uniqueFilename": "DefaultEngine.ini",
            "filename": "DefaultEngine.ini",
            "hash": "d5b0412c1e7b8ee9d5e5f4768cf024f3ed7f7bf5",
            "hash256": "8cf7e3076ec7b01cefc32fe88a50bf46a5eb7ecbe48c014315968289386c82aa",
            "length": 690,
            "contentType": "text/plain; charset=UTF-8",
            "uploaded": "2022-09-07T13:53:03.822Z",
            "storageType": "S3",
            "doNotCache": false,
        },
        {
            "uniqueFilename": "DefaultGame.ini",
            "filename": "DefaultGame.ini",
            "hash": "6c9ef6b3a0b747848f03b67cb2630b824def2364",
            "hash256": "4212962b048b12fe907634d6fe37358aca893442271a9d265a3c566afb4c6d5d",
            "length": 448,
            "contentType": "text/plain; charset=UTF-8",
            "uploaded": "2022-09-07T13:53:03.822Z",
            "storageType": "S3",
            "doNotCache": false,
        },
        {
            "uniqueFilename": "DefaultRuntimeOptions.ini",
            "filename": "DefaultRuntimeOptions.ini",
            "hash": "7ec1ab3239c2dc28cbd2b4b985f17b3a66818409",
            "hash256": "5640ae2513980d62961d44370f2ea2f3d1111fe5c720edbaadb4862d1c2f46db",
            "length": 123,
            "contentType": "text/plain; charset=UTF-8",
            "uploaded": "2022-09-07T13:53:03.822Z",
            "storageType": "S3",
            "doNotCache": false,
        }
    ]);
}