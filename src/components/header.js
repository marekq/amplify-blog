import React, {Component} from "react";
import Link from "gatsby-link";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import DarkModeToggle from "react-dark-mode-toggle";
import "./css/bootstrap.min.css";

// set page title
var pageTitle = 'Serverless Blog';

class Header extends Component {
	constructor(props) {
    super(props);

    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.toggle = this.toggle.bind(this);

    // set initial state
    this.state = {
      show: false,
      blogname: 'All blogs',
      isDarkMode: false
    };
  };

  // show dropdown menu
  showDropdown() {
    this.setState({
      toggle: true
    });
  };

  // hide dropdown menu
  hideDropdown() {
    this.setState({
      toggle: false
    });

  };

  // toggle dropdown menu
  toggle() {

    if (this.state.toggle === false) {

      this.setState({
        toggle: true
      });

    } else if (this.state.toggle === true) {

      this.setState({
        toggle: false
      });

    };
  };

  // toggle dark mode
  setIsDarkMode = () => {
    if (this.state.isDarkMode === false) {

      this.setState({
        isDarkMode: true
      });

    } else if (this.state.isDarkMode === true) {

      this.setState({
        isDarkMode: false
      });

    };

    console.log('darkmode : ' + this.state.isDarkMode);
    this.forceUpdate();
  };

  // render header
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
          <br />
        </Link>
      )
    }

    return (
      <Navbar expand = "navbar-expand-xl" sticky = "top" key = "navbar" style = {{backgroundColor: this.state.isDarkMode ? "darkblue" : "#f4f4f4", minWidth: "375px", maxWidth: "800px", textAlign: "center" }}>
        <title>{pageTitle}</title>
        <b>
          <Link key = "home" to = "/">All Blogs</Link>
        </b>
        <b>
          <NavDropdown 
            title = "Blogs"
            key = "aws" 
            id = "basic-nav-dropdown" 
            onMouseEnter = {this.showDropdown} 
            onMouseLeave = {this.hideDropdown} 
            onToggle = {this.toggle}
            className = "d-inline-block"
            show = {this.state.toggle}
          >
            {menubar}
          </NavDropdown>
        </b>
        <b><Link key = "about" to = "/about/" activeStyle = {{ color: "red" }}>About</Link></b>
        <b><Link key = "marek" to = "/marek/" activeStyle = {{ color: "red" }}>Marek</Link></b>
        <DarkModeToggle
          onChange = {this.setIsDarkMode}
          checked = {this.state.isDarkMode}
          size = {50}
        />
      </Navbar>
    )
  }
}

export default Header
