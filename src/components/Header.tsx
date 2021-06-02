import React from "react";
import { ConfigurationInterface } from ".";
import { Row, Col, Container } from "react-bootstrap";

interface Props { config?: ConfigurationInterface }

export const Header: React.FC<Props> = (props) => {
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
                            <a className="navbar-brand" href="/"><img src={props.config?.logoHeader || "/images/logo.png"} alt="logo" /></a>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div id="navSpacer" ></div>
        </>
    );
}