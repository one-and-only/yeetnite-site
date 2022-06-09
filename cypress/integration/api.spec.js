describe('Test REST API', () => {
    it('Generic EG1 OAuth Token', () => {
        cy.request({
            method: 'POST',
            url: '/account/api/oauth/token?grant_type=client_credential&token_type=eg1',
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.access_token).to.not.be.empty;
            expect(response.body.client_id).to.equal('yeetniteclientlol');
            expect(response.body.account_id).to.be.undefined;
        });
    });
    it('Fortnite Update Check', () => {
        cy.request({
            method: 'GET',
            url: '/fortnite/api/v2/versioncheck/Windows?version=++Fortnite+Release-6.21-CL-4526925-Windows',
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.type).to.equal('NO_UPDATE');
        });
    });
    it('Cloud Storage System', () => {
        cy.request('/fortnite/api/cloudstorage/system').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        });
    });
    it('Waiting Room', () => {
        cy.request('/waitingroom/api/waitingroom').then(response => {
            expect(response.status).to.equal(204);
        });
    });
    it('User OAuth Token', () => {
        const body = 'grant_type=password&username=testUser&password=Antonios12%21&includePerms=true&token_type=eg1'
        cy.request({
            method: 'POST',
            url: '/account/api/oauth/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': body.length,
            },
            body: body,
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
            expect(response.body.account_id).to.equal('testUser');
            expect(response.body.in_app_id).to.equal('testUser');
        });
    });
    it('Datarouter', () => {
        cy.request({
            method: 'POST',
            url: '/datarouter/api/v1/public/data?SessionID=%7B8A6D302D-4CAC-C579-B03D-07805F944F28%7D&AppID=Fortnite.Fortnite&AppVersion=1.0.0%20-%20%2B%2BFortnite%2BRelease-6.21-CL-4526925&UserID=a67829d347deeaf6a69fd392681deda6%7CtestUser%7Ce2dd9efa-ddcc-42ec-ae31-7897a4b88a0f%7Ca473284e06eac365ebcc3e95c7e95b50%7C&AppEnvironment=datacollector-binary&UploadType=eteventstream',
            body: { "Events": [{ "EventName": "Store.CatalogChanged", "DateOffset": "+00:00:39.545", "GameSessionID": "FRONTEND-DDF09CA44881B67A56F5228943225992", "Platform": "Windows", "ProviderType": "Client", "GameState": "FortGameStateFrontEnd-Athena", "NewOffers": "CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Melee:-1;-1,CardPack_Bronze_Ranged:-1;-1,CardPack_Bronze:-1;-1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Traps:-1;-1,CardPack_Bronze:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Event_Founders:-1;-1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Melee:-1;-1,CardPack_Bronze_Ranged:-1;-1,CardPack_Bronze:-1;-1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Traps:-1;-1,CardPack_Jackpot:-1;-1,CardPack_Bronze:-1;-1,CardPack_Basic:-1;1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Ranged:-1;-1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Melee:-1;-1,CardPack_Bronze_Ranged:-1;-1,CardPack_Bronze:-1;-1,CardPack_Bronze_Personnel:-1;-1,CardPack_Bronze_Traps:-1;-1,CardPack_Bronze:-1;-1,CardPack_Bronze:0;1,CardPack_Jackpot:500;4,CardPack_Bronze:0;2" }, { "EventName": "UI.InteractivityReport", "DateOffset": "+00:00:36.498", "GameSessionID": "FRONTEND-DDF09CA44881B67A56F5228943225992", "Platform": "Windows", "ProviderType": "Client", "GameState": "FortGameStateFrontEnd-Athena", "TotalInteractiveTime": "63.889999", "TotalNonInteractiveTime": "14.11", "Phases": [{ "Name": "InitialLoad", "TimeSpent": 11.87, "Interactable": false, "FirstTime": true }, { "Name": "Login", "TimeSpent": 57.92, "Interactable": true, "FirstTime": true }, { "Name": "LoginToGameModeTransition", "TimeSpent": 2.23, "Interactable": false, "FirstTime": true }, { "Name": "SubgameSelect", "TimeSpent": 2.91, "Interactable": true, "FirstTime": true }, { "Name": "SubgameSelectToLobby", "TimeSpent": 3.04, "Interactable": true, "FirstTime": true }, { "Name": "AthenaGameplay", "TimeSpent": 0, "Interactable": true, "FirstTime": true }] }, { "EventName": "UFortActivatableVideoPanel.VideoSkipped", "DateOffset": "+00:00:33.329", "GameSessionID": "FRONTEND-DDF09CA44881B67A56F5228943225992", "Platform": "Windows", "ProviderType": "Client", "GameState": "FortGameStateFrontEnd-Athena" }, { "EventName": "UFortActivatableVideoPanel.WatchedFullVideo", "DateOffset": "+00:00:33.329", "GameSessionID": "FRONTEND-DDF09CA44881B67A56F5228943225992", "Platform": "Windows", "ProviderType": "Client", "GameState": "FortGameStateFrontEnd-Athena" }, { "EventName": "GameOptionsOpened", "DateOffset": "+00:00:01.296", "GameSessionID": "FRONTEND-DDF09CA44881B67A56F5228943225992", "Platform": "Windows", "ProviderType": "Client", "GameState": "FortGameStateFrontEnd-Athena", "UserId": "testUser" }, { "EventName": "GameOptionsOpened", "DateOffset": "+00:00:00.061", "GameSessionID": "FRONTEND-DDF09CA44881B67A56F5228943225992", "Platform": "Windows", "ProviderType": "Client", "GameState": "FortGameStateFrontEnd-Athena", "UserId": "testUser" }, { "EventName": "Core.MemoryStats", "DateOffset": "+00:00:00.002", "GameSessionID": "FRONTEND-DDF09CA44881B67A56F5228943225992", "Platform": "Windows", "ProviderType": "Client", "GameState": "FortGameStateFrontEnd-Athena", "AvailablePhysical": "9468817408", "AvailableVirtual": "140729805328384", "UsedPhysical": "1767710720", "PeakUsedPhysical": "1992478720", "UsedVirtual": "2779029504", "PeakUsedVirtual": "2999160832" }, { "EventName": "Core.ClientLogout", "DateOffset": "+00:00:00.000", "GameSessionID": "FRONTEND-DDF09CA44881B67A56F5228943225992", "Platform": "Windows", "ProviderType": "Client", "GameState": "FortGameStateFrontEnd-Athena", "Reason": "Quit", "Vivox.NumActivations": "0", "Vivox.SecondsSpentActivated": "0" }] },
        }).then(response => {
            expect(response.status).to.equal(200);
        });
    });
    it('ClientSettings.Sav Upload', () => {
        cy.readFile('includes/ClientSettings.Sav.example').then(rawClientSettings_Sav => {
            cy.request({
                method: 'PUT',
                url: '/fortnite/api/cloudstorage/user/testUser/ClientSettings.Sav',
                body: rawClientSettings_Sav,
            }).then(response => {
                expect(response.status).to.equal(204);
            });
        });
    });
    it('ClientSettings.Sav Download', () => {
        cy.request('/fortnite/api/cloudstorage/user/testUser/ClientSettings.Sav').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        });
    });
    it('ClientQuestLogin', () => {
        cy.request({
            method: 'POST',
            url: '/fortnite/api/game/v2/profile/testUser/client/ClientQuestLogin?profileId=athena&rvn=2718',
            body: {},
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.accountId).to.equal('testUser');
            expect(response.body.displayName).to.equal('testUser');
        });
    });
    it('Cloud Storage Personal', () => {
        cy.request({
            method: 'GET',
            url: '/fortnite/api/cloudstorage/user/testUser',
            body: {},
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        })
    });
    it('Query Profile - Athena', () => {
        cy.request({
            method: 'POST',
            url: '/fortnite/api/game/v2/profile/testUser/client/QueryProfile?profileId=athena&rvn=-1',
            body: {},
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        });
    });
    it('Version Check', () => {
        cy.request('/fortnite/api/v2/versioncheck/Windows?version=%2B%2BFortnite%2BRelease-6.21-CL-4526925-Windows').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.type).to.equal('NO_UPDATE');
        });
    });
    it('Offers', () => {
        cy.request('/catalog/api/shared/bulk/offers?id=3b4c5df9efa5415b941cf74262865e4e&id=559f2ba95f874ec987d0ebfd2cc9c70a&id=4daadb392f1c4ee2b5a3af443e614d2a&id=ede05b3c97e9475a8d9be91da65750f0&id=f5c0e8ab6c9a4530999041e89e9b6934&id=9aa9f44cd8c24652953a1b204755b193&id=e2f25dae43604a839dd6f2c21b675d5e&id=d2da86026c71429a9cf5e76dfd89a1d3&id=e852b1940299435884365cec7dc3a608&id=35759d71512b47e5b2825669f1d9166a&id=c8319a037f9840e8b7549de480efb9c7&id=f05c43f7c1d24f5fbb1a6fa5a5a60edb&id=57f0419c4e4a4ea4858b2f37a98d5315&id=41134f4ff35a45a4923604cbb15e487d&id=85125898f3914946a9443bcce4667660&returnItemDetails=false&country=US&locale=en-US').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal({});
        });
    });
    it('Timeline', () => {
        cy.request('/fortnite/api/calendar/v1/timeline').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        });
    });
    it('Item Shop Catalog', () => {
        cy.request('/fortnite/api/storefront/v2/catalog?rvn=204').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        });
    });
    it('Game Content (Fortnite Pages)', () => {
        cy.request('/content/api/pages/fortnite-game').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        });
    });
    it('Try Play On Platform - Compatible', () => {
        cy.request({
            method: 'POST',
            url: '/fortnite/api/game/v2/tryPlayOnPlatform/account/testUser?platform=PC',
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.equal('true');
        });
    });
    it('Try Play On Platform - Incompatible', () => {
        cy.request({
            method: 'POST',
            url: '/fortnite/api/game/v2/tryPlayOnPlatform/account/testUser?platform=Mac',
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.equal('false');
        });
    });
    it('Enabled Features', () => {
        cy.request('/fortnite/api/game/v2/enabled_features').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal([]);
        });
    });
    it('Receipts', () => {
        cy.request('/fortnite/api/receipts/v1/account/testUser/receipts').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal([]);
        });
    });
    it('Keychain', () => {
        cy.request('/fortnite/api/storefront/v2/keychain?numKeysDownloaded=0&rvn=204').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        });
    });
    it('Query Profile - Common Core', () => {
        cy.request({
            method: 'POST',
            url: '/fortnite/api/game/v2/profile/testUser/client/QueryProfile?profileId=common_core&rvn=-1',
            body: {},
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.profileId).to.not.be.empty;
        });
    });
    it('Query Profile - Common Public', () => {
        cy.request({
            method: 'POST',
            url: '/fortnite/api/game/v2/profile/testUser/client/QueryProfile?profileId=common_public&rvn=-1',
            body: {},
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        });
    });
    it('Friends List', () => {
        cy.request('/friends/api/public/friends/testUser?includePending=true').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        });
    });
    it('Server Status', () => {
        cy.request('/lightswitch/api/service/bulk/status?serviceId=Fortnite').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body[0].status).to.equal('UP');
        });
    });
    it('Blocklist', () => {
        cy.request('/friends/api/public/blocklist/testUser').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
            for (let i = 0; i < response.body.blockedUsers.length; i++) {
                expect(response.body.blockedUsers[i]).to.not.be.empty;
            }
        });
    });
    it('External Auths', () => {
        cy.request('/account/api/public/account/testUser/externalAuths').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal([]);
        });
    });
    it('Recent Players', () => {
        cy.request('/friends/api/public/list/fortnite/testUser/recentPlayers').then(response => {
            expect(response.status).to.equal(200);
            (response.body.length > 0) ? expect(response.body).to.not.be.empty : expect(response.body).to.deep.equal([]);
            const recentPlayers = ["hello", "player 2"];
            for (let i = 0; i < recentPlayers.length; i++) {
                expect(recentPlayers[i]).to.not.be.empty;
            }
        });
    });
    it('Friend Settings', () => {
        cy.request('/friends/api/v1/testUser/settings').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal([]);
        });
    });
    it('Public Account Variation 1', () => {
        cy.request('/account/api/public/account?accountId=testUser').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal([{"id":"testUser","displayName":"testUser","externalAuths":{}}]);
        });
    });
    it('Public Account Variation 1 - Multiple Users', () => {
        cy.request('/account/api/public/account?accountId=Revvz&accountId=Fischsalat').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal([{"id":"Revvz","displayName":"Revvz","externalAuths":{}},{"id":"Fischsalat","displayName":"Fischsalat","externalAuths":{}}]);
        });
    });
    it('Public Acount Variation 2', () => {
        cy.request('/account/api/public/account/testUser').then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
            expect(response.body.id).to.equal('testUser');
            expect(response.body.displayName).to.equal('testUser');
            expect(response.body.email).to.equal('test@fakemail.com');
        });
    });
    it('OAuth Session Kill (Other Account)', () => {
        cy.request({
            method: 'DELETE',
            url: '/account/api/oauth/sessions/kill?killType=OTHERS_ACCOUNT_CLIENT_SERVICE',
        }).then(response => {
            expect(response.status).to.equal(204);
        });
    });
    it('STW Refresh Expeditions (Campaign; rvn = -1)', () => {
        cy.request({
            method: 'POST',
            url: '/fortnite/api/game/v2/profile/testUser/client/RefreshExpeditions?profileId=campaign&rvn=-1'
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.empty;
        });
    });
    it('STW Refresh Expeditions (Campaign; rvn != -1)', () => {
        cy.request({
            method: 'POST',
            url: '/fortnite/api/game/v2/profile/testUser/client/RefreshExpeditions?profileId=campaign&rvn=627'
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.profileChanges).to.deep.equal([]);
        });
    });
    it('Query Profile - collection_book_people0', () => {
        cy.request({
            method: 'POST',
            url: '/fortnite/api/game/v2/profile/testUser/client/QueryProfile?profileId=collection_book_people0&rvn=-1'
        }).then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.profileChanges).to.not.be.empty;
        });
    });
});