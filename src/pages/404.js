import { Link } from "@reach/router";
import React from "react";

const NotFound = () => (
  <center>
      <br />
      <b className = "title">404 - Page Not Found</b>
      <br /><br />
      <p>This page does not exist, return <Link to = "https://www.marek.rocks">home</Link>.</p>
      <br />
      <div style = {{height: "100px"}}><br /></div>
    <div style = {{height: "600px"}}><br /></div>
  </center>
)

export default NotFound
