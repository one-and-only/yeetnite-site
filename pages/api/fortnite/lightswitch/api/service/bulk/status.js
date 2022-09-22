export default function status(req, res) {
    res.json([
        {
            "serviceInstanceId": "fortnite",
            "status": "UP",
            "message": "Fortnite is up",
            "maintenanceUrl": null,
            "overrideCatalogIds": [],
            "allowedActions": [],
            "banned": false,
            "launcherInfoDTO": {
                "appName": "Fortnite",
                "catalogItemId": "fn",
                "namespace": "fn"
            }
        }
    ]);
}