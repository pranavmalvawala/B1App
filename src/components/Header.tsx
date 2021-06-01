import React from "react";
import { ConfigurationInterface } from ".";
import { Link } from "react-router-dom"
import { Row, Col, Container } from "react-bootstrap";
import UserContext from "../UserContext";

interface Props { config?: ConfigurationInterface }

export const Header: React.FC<Props> = (props) => {
    const [showUserMenu, setShowUserMenu] = React.useState(false);

    const toggleUserMenu = (e: React.MouseEvent) => { e.preventDefault(); setShowUserMenu(!showUserMenu); }
    const context = React.useContext(UserContext);

    const toggleSidebar = () => {
        $('#sidebarFlex').toggle();
    }


    return (
        <>
            <div id="navbar" className="fixed-top">
                <Container>
                    <Row>
                        <div className="col-6">
                            <a href="#" onClick={toggleSidebar} id="hamburger"><i className="fas fa-bars"></i></a>
                            <a className="navbar-brand" href="/"><img src={props.config?.logoHeader || "/images/logo.png"} alt="logo" /></a>
                        </div>
                    </Row>
                </Container>
            </div>
            <div id="navSpacer" ></div>
        </>
    );
}