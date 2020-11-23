import { Link } from "@reach/router";
import React from "react";
import { Card } from 'react-bulma-components';

const NotFound = () => (
  <center>
    <Card>
      <br />
      <b className = "title">404 - Page Not Found</b>
      <br /><br />
      <p>This page does not exist, return <Link to = "https://www.marek.rocks">home</Link>.</p>
      <br />
      <div style = {{height: "100px"}}><br /></div>
    </Card>
    <div style = {{height: "600px"}}><br /></div>
  </center>
)

export default NotFound
