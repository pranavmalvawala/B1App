import React from "react";
import { ConfigHelper, UserHelper, NavItems } from ".";
import { Container, Col } from "react-bootstrap";
import { AppearanceHelper } from "../appBase/helpers/AppearanceHelper";
import { Link, useLocation } from "react-router-dom"

export const Header = () => {
  const location = useLocation()

  const getLogin = () => {
    const { firstName, lastName } = UserHelper.user || {}
    if (UserHelper.user) return (
      <a href="about:blank" id="userMenuLink" data-toggle="collapse" data-target="#userMenu" aria-controls="navbarToggleMenu" aria-expanded="false" aria-label="Toggle navigation">
        <img src="/images/sample-profile.png" alt="user" />
        {firstName} {lastName} <i className="fas fa-caret-down"></i>
      </a>
    )

    return (
      <>
        <Link to="/login" className={ConfigHelper.current.tabs.length > 6 ? "d-none" : "d-none d-lg-block"}><i className="fas fa-sign-in-alt"></i> Log in</Link>
        <a href="about:blank" id="userMenuLink" className={ConfigHelper.current.tabs.length > 6 ? "" : "d-lg-none"} data-toggle="collapse" data-target="#userMenu" aria-controls="navbarToggleMenu" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars fa-lg" />
        </a>
      </>

    )
  }

  const toggleMenuItems = () => {
    const { firstName, lastName } = UserHelper.user || {}
    const userName = `${firstName || ""} ${lastName || ""}`
    const usernameLength = userName.length
    let menuNav = document.getElementById("nav-menu");
    let listItems = Array.from(menuNav.children);
    listItems.pop()
    listItems.forEach((_, i) => {
      if (i < (usernameLength <= 5 ? 3 : usernameLength < 24 ? 2 : 1)) {
        listItems[i].classList.add("d-md-none");
      } else if (
        i < (usernameLength <= 5 ? 5 : usernameLength < 24 ? 4 : 3)
      ) {
        listItems[i].classList.add("d-lg-none");
      } else if (i < (usernameLength < 24 ? 6 : 5)) {
        listItems[i].classList.add("d-xl-none");
      }
    });
  };

  React.useEffect(() => { toggleMenuItems(); });

  const userAction = UserHelper.user ? (<Link to="/logout" aria-label="logoutBtn"><i className="fas fa-lock"></i> Logout</Link>) : (<Link to="/login"><i className="fas fa-sign-in-alt"></i> Log in</Link>)

  const routes: string[] = ["/url", "/stream", "/bible"]
  const applyClass = routes.some(r => location.pathname.includes(r))

  return (
    <>
      <div id="navbar" className={`fixed-top ${applyClass ? "shadow-none" : ""}`}>
        <Container>
          <div className="d-flex justify-content-between">
            <div className="app-logo">
              <Link className="navbar-brand" to="/">
                <img src={AppearanceHelper.getLogoLight(ConfigHelper.current?.appearance, "/images/logo.png")} alt="logo" />
              </Link>
            </div>

            <Col className="d-none d-md-block" style={{ borderLeft: "2px solid #EEE", borderRight: "2px solid #EEE", maxWidth: "703px", margin: "0 15px" }}>
              <ul id="nav-main" className="nav nav-fill d-flex overflow-hidden" style={{ height: "55px" }}>
                <NavItems prefix="main" />
              </ul>
            </Col>

            <div className="d-flex align-items-center" id="navRight">
              {getLogin()}
            </div>
          </div>
        </Container>
        <div className="container collapse" id="userMenu">
          <div>
            <ul id="nav-menu" className="nav d-flex flex-column">
              <NavItems />
              {userAction}
            </ul>
          </div>
        </div>
      </div>
      <div id="navSpacer" />
    </>
  )
}
