import React from "react";
import { ConfigHelper, ConfigurationInterface, Loading, Theme } from "./components"
import { Row, Col } from "react-bootstrap"
import { Sidebar } from "./components/Sidebar";

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
        <>
            <Theme config={config} />
            <Row>
                <Col xl={3} >
                    <Sidebar config={config} />
                </Col>
                <Col xl={9}>
                    Content
            </Col>
            </Row>
        </>

    );
}