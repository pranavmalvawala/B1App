import { ChurchInterface } from '../appBase/interfaces';
import { ApiHelper, UniqueIdHelper, LinkInterface } from '../components';
export interface ColorsInterface { primary: string, contrast: string, header: string }
export interface LogoInterface { url: string, image: string }
export interface ButtonInterface { text: string, url: string }
//export interface TabInterface { text: string, url: string, icon: string, type: string, data: string, updated?: boolean }
export interface ServiceInterface { videoUrl: string, serviceTime: string, duration: string, earlyStart: string, chatBefore: string, chatAfter: string, provider: string, providerKey: string, localCountdownTime?: Date, localStartTime?: Date, localEndTime?: Date, localChatStart?: Date, localChatEnd?: Date, label: string }
export interface ConfigurationInterface { keyName?: string, churchId?: string, primaryColor?: string, primaryContrast?: string, secondaryColor?: string, secondaryContrast?: string, logoSquare?: string, logoHeader?: string, tabs?: LinkInterface[], church: ChurchInterface }


export class ConfigHelper {
    static current: ConfigurationInterface;

    static async load(keyName: string) {
        const churchId = await ConfigHelper.loadChurchId(keyName);
        const result: ConfigurationInterface = await ApiHelper.getAnonymous("/settings/public/" + churchId, "AccessApi");
        const tabs: LinkInterface[] = await ApiHelper.getAnonymous("/links/church/" + churchId + "?category=tab", "B1Api");
        const church = await ApiHelper.getAnonymous("/churches/lookup/?id=" + churchId, "AccessApi")
        result.church = church;
        result.tabs = tabs;
        localStorage.setItem(`b1theme_${keyName}`, JSON.stringify(result));
        result.keyName = keyName;
        ConfigHelper.current = result;
        return result;
    }

    static async loadChurchId(keyName: string) {
        const lsKey = "keyName_" + keyName;
        var churchId = localStorage.getItem(lsKey) || "";
        if (churchId === "") {
            const church = await ApiHelper.getAnonymous("/churches/lookup/?subDomain=" + keyName, "AccessApi")
            churchId = church.id;
            if (!UniqueIdHelper.isMissing(churchId)) localStorage.setItem(lsKey, churchId);
        }
        return churchId;
    }

}
