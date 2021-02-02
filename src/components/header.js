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
    this.toggle = this.toggle.bind(this);
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
  toggle() {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  }

  render() {

    // create a list of blog categories for the menu
    var menubar = [];
    const blogpaths = ['cloudguru', 'compute', 'corey', 'containers', 'database', 'devops', 'jeremy', 'ml', 'mobile', 'newsblog', 'open-source', 'security', 'whats-new', 'yan'];

    // add menu entry per blog
    for (const [index, value] of blogpaths.entries()) {
      menubar.push(<Link 
        key = {index} 
        style = {{margin: "1em"}} 
        activeStyle={{ color: "red" }} 
        to = {`/blog/${value.toString()}/`} 
      >{value.toString()}<br /></Link>)
    }

    return (
      <Navbar expand = "navbar-expand-xl" sticky = "top" key = "navbar" style = {{backgroundColor: "#f4f4f4" }}>
        <title>{pageTitle}</title>
        <b>
          <Link key = "home" to = "/" activeStyle = {{ color: "red" }}>New Blogs</Link>
        </b>
        <b>
          <NavDropdown 
            key = "aws" 
            title = "Blogs"
            id = "basic-nav-dropdown" 
            onMouseEnter = {this.showDropdown} 
            onMouseLeave = {this.hideDropdown} 
            toggle = {this.toggle} 
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
