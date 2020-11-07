import React, {Component} from "react"
import "./css/bootstrap.min.css"
import { Link } from "gatsby";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import { Container } from "@material-ui/core";

class Header extends Component {
  render() {
    return (
      <Container>
        <Navbar sticky = "top" bg = "light" expand = "lg" key = "top">
          <Navbar.Brand key = "home" href = "/">Home</Navbar.Brand>
            <Link key = "about" to = "/app/about">About{' '}</Link>
            <Link key = "marek" to = "/app/marek">Marek </Link>
            <NavDropdown key = "aws" title="AWS Blogs" id="basic-nav-dropdown">
              <NavDropdown.Item key = "all" href = "/app/all">All</NavDropdown.Item>
              <NavDropdown.Item key = "whats-new" href = "/app/whats-new">What's New</NavDropdown.Item>
              <NavDropdown.Item key = "newsblog" href = "/app/newsblog">Newsblog</NavDropdown.Item>
              <NavDropdown.Item key = "compute" href = "/app/compute">Compute</NavDropdown.Item>
              <NavDropdown.Item key = "devops" href = "/app/devops">DevOps</NavDropdown.Item>
              <NavDropdown.Item key = "ml" href = "/app/ml">ML</NavDropdown.Item>
              <NavDropdown.Item key = "database" href = "/app/database">Database</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
      </Container>
    )
  }
}

export default Header
