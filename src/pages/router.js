import React from "react";
import { Router } from "@reach/router";
import Blog from "../components/aws";
import FourZeroFour from "./404.js";
import View from "../components/view";
import Marek from "../components/marek";
import About from "../components/about";

const RouterPage = () => (
  <View title = "">
    <Router>
      <FourZeroFour default />
      <Marek path = "/marek/" />
      <About path = "/about/" />
      <Blog path = "/" />

      <Blog path = "/blog">
        <Blog path = "/all/" />
        <Blog path = "/apn/" />
        <Blog path = "/architecture/" />
        <Blog path = "/big-data/" />
        <Blog path = "/biz-prod/" />
        <Blog path = "/cli/" />
        <Blog path = "/cloudguru/" />
        <Blog path = "/compute/" />
        <Blog path = "/contact-center/" />
        <Blog path = "/containers/" />
        <Blog path = "/corey/" />
        <Blog path = "/cost-mgmt/" />
        <Blog path = "/database/" />
        <Blog path = "/desktop/" />
        <Blog path = "/developer/" />
        <Blog path = "/devops/" />
        <Blog path = "/enterprise-strat/" />
        <Blog path = "/gamedev/" />
        <Blog path = "/gametech/" />
        <Blog path = "/governance/" />
        <Blog path = "/industries/" />
        <Blog path = "/infrastructure/" />
        <Blog path = "/iot/" />
        <Blog path = "/java/" />
        <Blog path = "/jeremy/" />
        <Blog path = "/management-tools/" />
        <Blog path = "/marketplace/" />
        <Blog path = "/media/" />
        <Blog path = "/messaging/" />
        <Blog path = "/ml/" />
        <Blog path = "/mobile/" />
        <Blog path = "/modernizing/" />
        <Blog path = "/networking/" />
        <Blog path = "/newsblog/" />
        <Blog path = "/open-source/" />
        <Blog path = "/public-sector/" />
        <Blog path = "/robotics/" />
        <Blog path = "/sap/" />
        <Blog path = "/security/" />
        <Blog path = "/security-bulletins/" />
        <Blog path = "/serverless/" />
        <Blog path = "/storage/" />
        <Blog path = "/training/" />
        <Blog path = "/werner/" />
        <Blog path = "/whats-new/" />
        <Blog path = "/yan/" />
      </Blog>
    </Router>
  </View>
)

export default RouterPage
