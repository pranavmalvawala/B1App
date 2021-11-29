import { ApiHelper } from "../appBase/helpers/ApiHelper";

export class EnvironmentHelper {
  private static AccessApi = "";
  private static B1Api = "";
  private static MembershipApi = "";
  private static AttendanceApi = "";
  private static GivingApi = "";
  static ContentRoot = "";
  static ChurchAppsUrl = "";
  static AccountsAppUrl = "";
  static StreamingLiveAppUrl = "";
  static LessonsAppUrl = "";
  static GoogleAnalyticsTag = "";

  static init = () => {
    switch (process.env.REACT_APP_STAGE) {
      case "staging": EnvironmentHelper.initStaging(); break;
      case "prod": EnvironmentHelper.initProd(); break;
      default: EnvironmentHelper.initDev(); break;
    }
    ApiHelper.apiConfigs = [
      { keyName: "AccessApi", url: EnvironmentHelper.AccessApi, jwt: "", permisssions: [] },
      { keyName: "AttendanceApi", url: EnvironmentHelper.AttendanceApi, jwt: "", permisssions: [] },
      { keyName: "MembershipApi", url: EnvironmentHelper.MembershipApi, jwt: "", permisssions: [] },
      { keyName: "B1Api", url: EnvironmentHelper.B1Api, jwt: "", permisssions: [] },
      { keyName: "GivingApi", url: EnvironmentHelper.GivingApi, jwt: "", permisssions: [] }
    ];
  }

  static initDev = () => {
    EnvironmentHelper.AccessApi = process.env.REACT_APP_ACCESS_API || "";
    EnvironmentHelper.MembershipApi = process.env.REACT_APP_MEMBERSHIP_API || "";
    EnvironmentHelper.AttendanceApi = process.env.REACT_APP_ATTENDANCE_API || "";
    EnvironmentHelper.B1Api = process.env.REACT_APP_B1_API || "";
    EnvironmentHelper.GivingApi = process.env.REACT_APP_GIVING_API || "";
    EnvironmentHelper.ContentRoot = process.env.REACT_APP_CONTENT_ROOT || "";
    EnvironmentHelper.ChurchAppsUrl = process.env.REACT_APP_CHURCH_APPS_URL || "";
    EnvironmentHelper.AccountsAppUrl = process.env.REACT_APP_ACCOUNTS_APP_URL || "";
    EnvironmentHelper.StreamingLiveAppUrl = process.env.REACT_APP_STREAMINGLIVE_URL || "";
    EnvironmentHelper.LessonsAppUrl = process.env.REACT_APP_LESSONS_URL || "";
    EnvironmentHelper.GoogleAnalyticsTag = process.env.REACT_APP_GOOGLE_ANALYTICS_TAG || "";
  }

  //NOTE: None of these values are secret.
  static initStaging = () => {
    EnvironmentHelper.AccessApi = "https://accessapi.staging.churchapps.org";
    EnvironmentHelper.AttendanceApi = "https://attendanceapi.staging.churchapps.org";
    EnvironmentHelper.MembershipApi = "https://membershipapi.staging.churchapps.org";
    EnvironmentHelper.B1Api = "https://api.staging.b1.church";
    EnvironmentHelper.GivingApi = "https://givingapi.staging.churchapps.org";
    EnvironmentHelper.ContentRoot = "https://content.staging.churchapps.org";
    EnvironmentHelper.ChurchAppsUrl = "https://staging.churchapps.org";
    EnvironmentHelper.AccountsAppUrl = "https://accounts.staging.churchapps.org";
    EnvironmentHelper.StreamingLiveAppUrl = "https://{key}.staging.streaminglive.church"
    EnvironmentHelper.LessonsAppUrl = "https://staging.lessons.church"
    EnvironmentHelper.GoogleAnalyticsTag = "";
  }

  //NOTE: None of these values are secret.
  static initProd = () => {
    EnvironmentHelper.AccessApi = "https://accessapi.churchapps.org";
    EnvironmentHelper.AttendanceApi = "https://attendanceapi.churchapps.org";
    EnvironmentHelper.MembershipApi = "https://membershipapi.churchapps.org";
    EnvironmentHelper.B1Api = "https://api.b1.church";
    EnvironmentHelper.GivingApi = "https://givingapi.churchapps.org";
    EnvironmentHelper.ContentRoot = "https://content.churchapps.org";
    EnvironmentHelper.ChurchAppsUrl = "https://churchapps.org";
    EnvironmentHelper.AccountsAppUrl = "https://accounts.churchapps.org";
    EnvironmentHelper.StreamingLiveAppUrl = "https://{key}.streaminglive.church"
    EnvironmentHelper.LessonsAppUrl = "https://lessons.church"
    EnvironmentHelper.GoogleAnalyticsTag = "UA-164774603-8";
  }

}
