import React from "react";
import { ConfigHelper, ConfigurationInterface, Loading, Theme } from "./components"
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components";

export const Home = () => {

    const [config, setConfig] = React.useState<ConfigurationInterface>({} as ConfigurationInterface);

    const loadConfig = React.useCallback(async () => {
        const keyName = window.location.hostname.split(".")[0];
        const localThemeConfig = localStorage.getItem(`b1theme_${keyName}`);
        setConfig(JSON.parse(localThemeConfig) || {});

        ConfigHelper.load(keyName).then(data => {
            var d: ConfigurationInterface = data;
            setConfig(d);
        });
    }, []);


    React.useEffect(() => {
        loadConfig();
    }, [loadConfig]);


    if (config.keyName === undefined) return <Loading config={config} />
    else return (
        <div id="root">
            <div id="appWrapper" className="container" >
                <Theme config={config} />
                <div id="headerFlex"><Header config={config} /></div>
                <div id="bodyFlex">
                    <div id="sidebarFlex">
                        <Sidebar config={config} />
                    </div>
                    <div id="contentFlex">
                        <iframe title="Content" src="https://biblia.com/api/plugins/embeddedbible?layout=normal&historyButtons=false&resourcePicker=false&shareButton=false&textSizeButton=false&startingReference=Ge1.1&resourceName=nirv" style={{ flex: 1 }} />
                    </div>
                </div>
            </div>
        </div>

    );
}