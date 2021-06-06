import React from "react";
import { ConfigHelper } from ".";
import { Row, Col, Container } from "react-bootstrap";
import { AppearanceHelper } from "../appBase/helpers/AppearanceHelper";


export const Header = () => {
    const toggleSidebar = (e: React.MouseEvent) => {
        e.preventDefault();
        $('#sidebarFlex').toggle();
    }

    return (
        <>
            <div id="navbar" className="fixed-top">
                <Container>
                    <Row>
                        <Col>
                            <a href="about:blank" onClick={toggleSidebar} id="hamburger"><i className="fas fa-bars"></i></a>
                            <a className="navbar-brand" href="/"><img src={AppearanceHelper.getLogoHeader(ConfigHelper.current?.appearance, "/images/logo.png")} alt="logo" /></a>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div id="navSpacer" ></div>
        </>
    );
}