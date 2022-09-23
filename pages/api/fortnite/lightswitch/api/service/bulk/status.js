import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function status() {
    return edgeResponse([
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