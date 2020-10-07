import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import About from "../components/about"
import AWS from "../components/aws"
import Marek from "../components/marek"

const NotFound = () => <p>Sorry, the page was not found.</p>

const App = () => (
  <Layout>
    <Router>
      <NotFound default />
      <About path="/app/about" />
      <Marek path="/app/marek" />
      <AWS path="/app/all" />
      <AWS path="/app/apn" />
      <AWS path="/app/architecture" />
      <AWS path="/app/big-data" />
      <AWS path="/app/biz-prod" />
      <AWS path="/app/cli" />
      <AWS path="/app/cloudguru" />
      <AWS path="/app/compute" />
      <AWS path="/app/contact-center" />
      <AWS path="/app/containers" />
      <AWS path="/app/corey" />
      <AWS path="/app/cost-mgmt" />
      <AWS path="/app/database" />
      <AWS path="/app/desktop" />
      <AWS path="/app/developer" />
      <AWS path="/app/devops" />
      <AWS path="/app/enterprise-strat" />
      <AWS path="/app/eric" />
      <AWS path="/app/gamedev" />
      <AWS path="/app/gametech" />
      <AWS path="/app/governance" />
      <AWS path="/app/industries" />
      <AWS path="/app/infrastructure" />
      <AWS path="/app/iot" />
      <AWS path="/app/james" />
      <AWS path="/app/java" />
      <AWS path="/app/jeremy" />
      <AWS path="/app/management-tools" />
      <AWS path="/app/marketplace" />
      <AWS path="/app/media" />
      <AWS path="/app/messaging" />
      <AWS path="/app/ml" />
      <AWS path="/app/mobile" />
      <AWS path="/app/modernizing" />
      <AWS path="/app/networking" />
      <AWS path="/app/newsblog" />
      <AWS path="/app/open-source" />
      <AWS path="/app/public-sector" />
      <AWS path="/app/robotics" />
      <AWS path="/app/sap" />
      <AWS path="/app/security" />
      <AWS path="/app/security-bulletins" />
      <AWS path="/app/serverless" />
      <AWS path="/app/storage" />
      <AWS path="/app/training" />
      <AWS path="/app/werner" />
      <AWS path="/app/whats-new" />
      <AWS path="/app/yan" />
    </Router>
  </Layout>
)

export default App
