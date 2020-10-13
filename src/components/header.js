import React from "react"
import bootstrap from "./css/bootstrap.min.css"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => (
  <header>
    <link rel="stylesheet" href={bootstrap} />

    <div className = "container">
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">     
        <img
          src="/favicon.ico"
          width="20"
          height="20"
          alt="logo"
        />
        {'  '}marek.rocks
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/app/all">Blog</Nav.Link>
        <Nav.Link href="/app/about">About</Nav.Link>
        <Nav.Link href="/app/marek">Marek</Nav.Link>
      </Nav>
    </Navbar>
    </div>
  </header>
)

export default Header
