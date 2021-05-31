import React from "react";
import { UserHelper } from ".";
import { Link } from "react-router-dom"
import { Row, Col, Container } from "react-bootstrap";
import UserContext from "../UserContext";

export const Header: React.FC = () => {
    const [showUserMenu, setShowUserMenu] = React.useState(false);

    const toggleUserMenu = (e: React.MouseEvent) => { e.preventDefault(); setShowUserMenu(!showUserMenu); }
    const context = React.useContext(UserContext);



    return (
        <>
            <div id="navbar" className="fixed-top">
                <Container>
                    <Row>
                        <div className="col-6 col-lg-2-5"><a className="navbar-brand" href="/"><img src="/images/logo.png" alt="logo" /></a></div>
                    </Row>
                </Container>
            </div>
            <div id="navSpacer" ></div>
        </>
    );
}