import React, {Component} from "react"
import { Link } from "gatsby";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./css/bootstrap.min.css";

// set page title
var pageTitle = 'Serverless Blog';

class Header extends Component {
  render() {

    // create a list of blog categories for the menu
    var menubar = [];
    const blogpaths = ['cloudguru', 'compute', 'corey', 'containers', 'database', 'devops', 'jeremy', 'ml', 'mobile', 'newsblog', 'open-source', 'security', 'whats-new', 'yan'];
    menubar.push(<Link key = 'all' style = {{margin: "1em"}} href = {'/blog/'}>all<br /></Link>)


    // add menu entry per blog
    for (const [index, value] of blogpaths.entries()) {
      menubar.push(<Link key = {index} style = {{margin: "1em"}} href = {`/blog/${value}`}>{value}<br /></Link>)
    }

    return (
      <Navbar expand = "navbar-expand-xl" sticky = "top" key = "navbar" bg = "light">
        <title>{pageTitle}</title>
        <b><NavDropdown key = "aws" title = "AWS Blogs" id = "basic-nav-dropdown" to = "/blog">
          {menubar}
        </NavDropdown></b>
        <b><Link key = "about" to = "/about">About</Link></b>
        <b><Link key = "marek" to = "/marek">Marek</Link></b>
      </Navbar>
    )
  }
}

export default Header
