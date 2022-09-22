export const config = {
    runtime: 'experimental-edge',
}

export default function system(req, res) {
    res.json([
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
            "hash": "3f181069406e0128473aebc219aec67e399aac4b",
            "hash256": "239e6dfc9bd3a1acc169d5b45c0c56207913d2b10cda776c774356bf14db5ed4",
            "length": 267,
            "contentType": "text/plain; charset=UTF-8",
            "uploaded": "2022-09-07T13:53:03.822Z",
            "storageType": "S3",
            "doNotCache": false,
        },
        {
            "uniqueFilename": "DefaultRuntimeOptions.ini",
            "filename": "DefaultRuntimeOptions.ini",
            "hash": "8f4f4d05a2b9a9b93a03b0206e4a2e3f6c6dedf8",
            "hash256": "08a7feeccef81a18bdcc3ca7e15ca4a0aa52fe2f36208d4043e2aba476fc8061",
            "length": 64,
            "contentType": "text/plain; charset=UTF-8",
            "uploaded": "2022-09-07T13:53:03.822Z",
            "storageType": "S3",
            "doNotCache": false,
        }
    ]);
}