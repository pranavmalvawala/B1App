import React from "react";
import { UserHelper, NavItems } from ".";
import { Link } from "react-router-dom"
import { Row, Col, Container } from "react-bootstrap";
import UserContext from "../UserContext";

export const Header: React.FC = () => {
    const [showUserMenu, setShowUserMenu] = React.useState(false);

    const toggleUserMenu = (e: React.MouseEvent) => { e.preventDefault(); setShowUserMenu(!showUserMenu); }
    const context = React.useContext(UserContext);

    const switchChurch = (e: React.MouseEvent) => {
        e.preventDefault();
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        UserHelper.selectChurch(context, id);
    }

    const getChurchLinks = () => {
        if (UserHelper.churches.length < 2) return null;
        else {
            var result: JSX.Element[] = [];
            UserHelper.churches.forEach(c => {
                const churchName = (c.id === UserHelper.currentChurch.id) ? (<b>{c.name}</b>) : (c.name);
                result.push(<a href="about:blank" data-id={c.id} onClick={switchChurch}><i className="fas fa-external-link-alt"></i> {churchName}</a>);
            });
            return result;
        }
    }

    const getUserMenu = () => {
        if (showUserMenu) return (
            <div className="container" id="userMenu">
                <div>
                    <ul className="nav flex-column d-xl-none"><NavItems /></ul>
                    {getChurchLinks()}
                    <Link to="/profile"><i className="fas fa-user"></i> Profile</Link>
                    <a href="mailto:support@b1.church"><i className="fas fa-envelope"></i> Support</a>
                    <Link to="/logout"><i className="fas fa-lock"></i> Logout</Link>
                </div>
            </div>)
        else return null;
    }


    return (
        <>
            <div id="navbar" className="fixed-top">
                <Container>
                    <Row>
                        <div className="col-6 col-lg-2-5"><a className="navbar-brand" href="/"><img src="/images/logo.png" alt="logo" /></a></div>
                        <Col className="d-none d-xl-block" xl={7} style={{ borderLeft: "2px solid #EEE", borderRight: "2px solid #EEE" }}>
                            <ul className="nav nav-fill">
                                <NavItems prefix="main" />
                            </ul>
                        </Col>
                        <div className="col-6 col-lg-2-5 text-right" style={{ paddingTop: 17 }} id="navRight" >
                            <a href="about:blank" onClick={toggleUserMenu} id="userMenuLink">
                                <i className="fas fa-user" /> &nbsp; {UserHelper.user.displayName} <i className="fas fa-caret-down"></i>
                            </a>
                        </div>
                    </Row>
                </Container>
            </div>
            {getUserMenu()}
            <div id="navSpacer" ></div>
        </>
    );
}
