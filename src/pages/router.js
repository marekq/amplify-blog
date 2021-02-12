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
      <Blog path = "/" />
      <Marek path = "/marek/" />
      <About path = "/about/" />
      <Blog path = "/blog/" />
      <Blog path = "/blog/all/" />
      <Blog path = "/blog/apn/" />
      <Blog path = "/blog/architecture/" />
      <Blog path = "/blog/big-data/" />
      <Blog path = "/blog/biz-prod/" />
      <Blog path = "/blog/cli/" />
      <Blog path = "/blog/cloudguru/" />
      <Blog path = "/blog/compute/" />
      <Blog path = "/blog/contact-center/" />
      <Blog path = "/blog/containers/" />
      <Blog path = "/blog/corey/" />
      <Blog path = "/blog/cost-mgmt/" />
      <Blog path = "/blog/database/" />
      <Blog path = "/blog/desktop/" />
      <Blog path = "/blog/developer/" />
      <Blog path = "/blog/devops/" />
      <Blog path = "/blog/enterprise-strat/" />
      <Blog path = "/blog/gamedev/" />
      <Blog path = "/blog/gametech/" />
      <Blog path = "/blog/governance/" />
      <Blog path = "/blog/industries/" />
      <Blog path = "/blog/infrastructure/" />
      <Blog path = "/blog/iot/" />
      <Blog path = "/blog/java/" />
      <Blog path = "/blog/jeremy/" />
      <Blog path = "/blog/management-tools/" />
      <Blog path = "/blog/marketplace/" />
      <Blog path = "/blog/media/" />
      <Blog path = "/blog/messaging/" />
      <Blog path = "/blog/ml/" />
      <Blog path = "/blog/mobile/" />
      <Blog path = "/blog/modernizing/" />
      <Blog path = "/blog/networking/" />
      <Blog path = "/blog/newsblog/" />
      <Blog path = "/blog/open-source/" />
      <Blog path = "/blog/public-sector/" />
      <Blog path = "/blog/quantum/" />
      <Blog path = "/blog/robotics/" />
      <Blog path = "/blog/sap/" />
      <Blog path = "/blog/security/" />
      <Blog path = "/blog/security-bulletins/" />
      <Blog path = "/blog/serverless/" />
      <Blog path = "/blog/startups/" />
      <Blog path = "/blog/storage/" />
      <Blog path = "/blog/training/" />
      <Blog path = "/blog/werner/" />
      <Blog path = "/blog/whats-new/" />
      <Blog path = "/blog/yan/" />
      <FourZeroFour path = "*" default />
    </Router>
  </View>
)

export default RouterPage
