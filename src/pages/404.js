import { Link } from "@reach/router";
import React from "react";

const NotFound = () => (
  <center>
      <br />
      <b>404</b>
      <br />
      <p>You just hit a route that doesn&#39;t exist... </p>
      <br />
      <p>Return <Link to = "/">home</Link></p>
      <br />
  </center>
)

export default NotFound
