export function getFortniteVersion(userAgent) {
    let res = {
        season: 0,
        build: 0.0,
        CL: "",
        lobby: ""
    }

    if (userAgent)
    {
        try {
            let BuildID = userAgent.split("-")[3].split(",")[0]
            if (!Number.isNaN(Number(BuildID))) {
                res.CL = BuildID;
            }

            if (Number.isNaN(Number(BuildID))) {
                let BuildID = userAgent.split("-")[3].split(" ")[0]
                if (!Number.isNaN(Number(BuildID))) {
                    res.CL = BuildID;
                }
            }
        } catch (err) {
            try {
                let BuildID = userAgent.split("-")[1].split("+")[0]
                if (!Number.isNaN(Number(BuildID))) {
                    res.CL = BuildID;
                }
            } catch (err) {}
        }

        try {
            let Build = userAgent.split("Release-")[1].split("-")[0];

            if (Build.split(".").length == 3) {
                Value = Build.split(".");
                Build = Value[0] + "." + Value[1] + Value[2];
            }

            res.season = Number(Build.split(".")[0]);
            res.build = Number(Build);
            res.lobby = `LobbySeason${res.season}`;

            if (Number.isNaN(res.season)) {
                throw new Error();
            }
        } catch (err) {
            res.season = 2;
            res.build = 2.0;
            res.lobby = "LobbyWinterDecor";
        }
    }

    return res;
}