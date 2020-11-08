import React, {Component} from "react"
import { Link } from "gatsby";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import "./css/bootstrap.min.css"

class Header extends Component {
  render() {

    // create a list of blog categories for the menu
    var menubar = [];
    const blogpaths = ['all', 'cloudguru', 'compute', 'corey', 'containers', 'database', 'devops', 'jeremy', 'ml', 'mobile', 'newsblog', 'open-source', 'security', 'serverless', 'whats-new', 'yan'];

    // add menu entry per blog
    for (const [index, value] of blogpaths.entries()) {
      menubar.push(<NavDropdown.Item key = {index} href = {`/app/${value}`}>{value}</NavDropdown.Item>)
    }

    return (
        <Navbar expand = "navbar-expand-xl" sticky = "top"  key = "navbar">
          <Link key = "home" to = "/">Home</Link>
          <NavDropdown key = "aws" title = "Blogs" id = "basic-nav-dropdown">
            {menubar}
          </NavDropdown>
          <Link key = "about" to = "/app/about">About</Link>
          <Link key = "marek" to = "/app/marek">Marek </Link>
        </Navbar>
    )
  }
}

export default Header
