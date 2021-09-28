import React, { useEffect, useState } from "react";
import { ConfigHelper, LinkInterface, UserHelper, PersonHelper, EnvironmentHelper, Permissions } from ".";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { AppearanceHelper } from "../appBase/helpers/AppearanceHelper";
import { Link } from "react-router-dom"

export const Header = () => {
  const [tabs, setTabs] = useState<LinkInterface[]>([])

  useEffect(() => {
    if (ConfigHelper.current?.tabs) {
      setTabs(ConfigHelper.current?.tabs)
    }
  }, [])

  // const toggleSidebar = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   $("#sidebarFlex").toggle();
  // }

  const getLinks = tabs.length > 0 && (
    <NavDropdown title="Links" id="basic-nav-dropdown" className="links-dropdown">
      {
        tabs.map((t) => (
          <NavDropdown.Item href={t.id} disabled key={t.id}><i className={t.icon}></i> {t.text}</NavDropdown.Item>
        ))
      }
    </NavDropdown>
  )

  const getLoginLink = () => {
    if (UserHelper.user) {
      let photo = <i className="fas fa-user" />
      let name: string = ""
      const { firstName, lastName } = UserHelper.user
      if (firstName) name = `${firstName} ${lastName}`
      if (PersonHelper.person?.name) name = PersonHelper.person.name.display
      if (PersonHelper.person?.photo) photo = <img src={EnvironmentHelper.ContentRoot + PersonHelper.person.photo} alt="avatar" />

      const personTitle = <>{photo} {name}</>
      return (
        <>
          <NavDropdown title={personTitle} id="basic-nav-dropdown" className="d-none d-md-block">
            <NavDropdown.Item href={UserHelper.createAppUrl(EnvironmentHelper.AccountsAppUrl, "/profile")} target="_blank">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/logout">Sign out</NavDropdown.Item>
          </NavDropdown>
          <div className="d-md-none">
            <Nav.Link disabled><b className="text-muted">{personTitle}</b></Nav.Link>
            <Nav.Link>Profile</Nav.Link>
            <Nav.Link>Sign out</Nav.Link>
          </div>
        </>
      );
    }

    return (<Nav.Link href="/login" className="btn sign-in-btn">Sign in</Nav.Link>);
  }

  const getUserTabs = () => {
    let tabs: JSX.Element[] = [];
    tabs.push(<Nav.Link>Bible</Nav.Link>)
    if (UserHelper.checkAccess(Permissions.b1Api.settings.edit)) tabs.push(<Nav.Link as={Link} to="/admin/settings">Settings</Nav.Link>)

    return tabs
  }

  return (
    <Navbar bg="light" expand="md" fixed="top" className="w-100">
      <Container>
        <Navbar.Brand href="#home">
          <Link className="navbar-brand" to="/">
            <img src={AppearanceHelper.getLogoLight(ConfigHelper.current?.appearance, "/images/logo.png")} alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="hamburger" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {getUserTabs()}
            {getLinks}
            <hr className="dropdown-divider d-md-hidden" />
          </Nav>
          <Nav>
            {getLoginLink()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
