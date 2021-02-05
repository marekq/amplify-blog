import React, {Component} from "react";
import Link from "gatsby-link";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./css/bootstrap.min.css";

// set page title
var pageTitle = 'Serverless Blog';

class Header extends Component {
	constructor(props) {
    super(props);

    this.toggle = this.toggleMenu.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);

    this.state = {
      show: false,
      blogname: 'All blogs'
    }
  }

  // hide dropdown menu
  showDropdown() {
    this.setState({
      show: true
    });
  }

  // hide dropdown menu
  hideDropdown() {
    this.setState({
      show: false
    });

  }

  // toggle dropdown menu
  toggleMenu() {
    if (this.state.toggle === false) {

      this.setState({
        toggle: true
      });

    } else if (this.state.toggle === true) {

      this.setState({
        toggle: false
      });

    }
  }

  render() {

    // create a list of blog categories for the menu
    var menubar = [];
    const blogpaths = ['cloudguru', 'compute', 'corey', 'containers', 'database', 'devops', 'jeremy', 'ml', 'mobile', 'newsblog', 'open-source', 'security', 'whats-new', 'yan'];

    // add menu entry per blog
    for (const [index, value] of blogpaths.entries()) {
      const url = '/blog/' + value.toString() + '/';
      const blog = value.toString();

      menubar.push(
        <Link 
          key = {index} 
          style = {{margin: "1em"}} 
          activeStyle = {{ color: "red" }} 
          to = {url}
        >
          {blog}
        </Link>
      )
      menubar.push(<br />)
    }

    return (
      <Navbar expand = "navbar-expand-xl" sticky = "top" key = "navbar" style = {{backgroundColor: "#f4f4f4", minWidth: "375px", maxWidth: "800px", textAlign: "center" }}>
        <title>{pageTitle}</title>
        <b>
          <Link key = "home" to = "/" activeStyle = {{ color: "red" }}>New Blogs</Link>
        </b>
        <b>
          <NavDropdown 
            title = "Blogs"
            key = "aws" 
            id = "basic-nav-dropdown" 
            onMouseEnter = {this.showDropdown} 
            onMouseLeave = {this.hideDropdown} 
            toggle = {this.toggleMenu} 
            className = "d-inline-block"
            show = {this.state.show}
          >
            {menubar}
          </NavDropdown>
        </b>
        <b><Link key = "about" to = "/about/" activeStyle={{ color: "red" }}>About</Link></b>
        <b><Link key = "marek" to = "/marek/" activeStyle={{ color: "red" }}>Marek</Link></b>
      </Navbar>
    )
  }
}

export default Header
