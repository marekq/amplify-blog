import React, {Component} from "react"
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
    menubar.push(<a key = 'all' style = {{margin: "1em"}} href = {'/blog/'}>all<br /></a>)


    // add menu entry per blog
    for (const [index, value] of blogpaths.entries()) {
      menubar.push(<a key = {index} style = {{margin: "1em"}} href = {`/blog/${value}/`}>{value}<br /></a>)
    }

    return (
      <Navbar expand = "navbar-expand-xl" sticky = "top" key = "navbar" bg = "light">
        <title>{pageTitle}</title>
        <b><a key = "home" href = "/">All Blogs</a></b>
        <b><NavDropdown key = "aws" title = "Other Blogs" id = "basic-nav-dropdown" to = "/blog">
          {menubar}
        </NavDropdown></b>
        <b><a key = "about" href = "/about">About</a></b>
        <b><a key = "marek" href = "/marek">Marek</a></b>
      </Navbar>
    )
  }
}

export default Header
