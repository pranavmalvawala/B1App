import { ApiHelper } from "../appBase/helpers/ApiHelper";

export class EnvironmentHelper {
    private static AccessApi = "";
    private static B1Api = "";
    static WebUrl = "";
    static ContentRoot = "";

    static init = () => {
        switch (process.env.REACT_APP_STAGE) {
            case "staging": EnvironmentHelper.initStaging(); break;
            case "prod": EnvironmentHelper.initProd(); break;
            default: EnvironmentHelper.initDev(); break;
        }
        ApiHelper.apiConfigs = [
            { keyName: "AccessApi", url: EnvironmentHelper.AccessApi, jwt: "", permisssions: [] },
            { keyName: "B1Api", url: EnvironmentHelper.B1Api, jwt: "", permisssions: [] },
        ];
        ApiHelper.defaultApi = "B1Api";
    }

    static initDev = () => {
        EnvironmentHelper.AccessApi = process.env.REACT_APP_ACCESS_API || "";
        EnvironmentHelper.B1Api = process.env.REACT_APP_B1_API_URL || "";
        EnvironmentHelper.WebUrl = process.env.REACT_APP_WEB_URL || "";
        EnvironmentHelper.ContentRoot = process.env.REACT_APP_CONTENT_ROOT || "";
    }

    //NOTE: None of these values are secret.
    static initStaging = () => {
        EnvironmentHelper.AccessApi = "https://accessapi.staging.churchapps.org";
        EnvironmentHelper.B1Api = "https://api.staging.b1.church";
        EnvironmentHelper.WebUrl = "https://staging.b1.church";
        EnvironmentHelper.ContentRoot = "https://data.staging.b1.church/data/";
    }

    //NOTE: None of these values are secret.
    static initProd = () => {
        EnvironmentHelper.AccessApi = "https://accessapi.churchapps.org";
        EnvironmentHelper.B1Api = "https://api.b1.church";
        EnvironmentHelper.WebUrl = "https://b1.church";
        EnvironmentHelper.ContentRoot = "https://data.b1.church/data/";
    }

}

