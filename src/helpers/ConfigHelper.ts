import { AppearanceHelper, AppearanceInterface } from '../appBase/helpers/AppearanceHelper';
import { ChurchInterface } from '../appBase/interfaces';
import { ApiHelper, LinkInterface } from '../components';
export interface ColorsInterface { primary: string, contrast: string, header: string }
export interface LogoInterface { url: string, image: string }
export interface ButtonInterface { text: string, url: string }
//export interface TabInterface { text: string, url: string, icon: string, type: string, data: string, updated?: boolean }
export interface ServiceInterface { videoUrl: string, serviceTime: string, duration: string, earlyStart: string, chatBefore: string, chatAfter: string, provider: string, providerKey: string, localCountdownTime?: Date, localStartTime?: Date, localEndTime?: Date, localChatStart?: Date, localChatEnd?: Date, label: string }
export interface ConfigurationInterface { keyName?: string, churchId?: string, tabs?: LinkInterface[], church: ChurchInterface, appearance: AppearanceInterface }


export class ConfigHelper {
    static current: ConfigurationInterface;
    static churchId = "";

    static async load(keyName: string) {
        const churchId = await ConfigHelper.getChurchId(keyName);
        let appearance = await AppearanceHelper.load(churchId);
        const tabs: LinkInterface[] = await ApiHelper.getAnonymous("/links/church/" + churchId + "?category=tab", "B1Api");
        const church = await ApiHelper.getAnonymous("/churches/lookup/?id=" + churchId, "AccessApi")
        let result: ConfigurationInterface = { appearance: appearance, church: church, tabs: tabs }
        localStorage.setItem(`b1theme_${keyName}`, JSON.stringify(result));
        result.keyName = keyName;
        ConfigHelper.current = result;
        return result;
    }

    static async getChurchId(keyName: string) {
        if (ConfigHelper.churchId === "") {
            const church = await ApiHelper.getAnonymous("/churches/lookup/?subDomain=" + keyName, "AccessApi")
            ConfigHelper.churchId = church.id;
        }
        return ConfigHelper.churchId;
    }

}
