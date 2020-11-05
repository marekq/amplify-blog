import React from "react"
import { Router } from "@reach/router"
import About from "../components/about"
import Marek from "../components/marek"
import Table from "../components/aws"
import FourZeroFour from "./404.js"
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

const App = () => (
    <Router>
      <FourZeroFour default />
      <About path="/app/about" />
      <Marek path="/app/marek" />
      <Table path="/app/table" />
      <Table path="/app/all" />
      <Table path="/app/apn" />
      <Table path="/app/architecture" />
      <Table path="/app/big-data" />
      <Table path="/app/biz-prod" />
      <Table path="/app/cli" />
      <Table path="/app/cloudguru" />
      <Table path="/app/compute" />
      <Table path="/app/contact-center" />
      <Table path="/app/containers" />
      <Table path="/app/corey" />
      <Table path="/app/cost-mgmt" />
      <Table path="/app/database" />
      <Table path="/app/desktop" />
      <Table path="/app/developer" />
      <Table path="/app/devops" />
      <Table path="/app/enterprise-strat" />
      <Table path="/app/eric" />
      <Table path="/app/gamedev" />
      <Table path="/app/gametech" />
      <Table path="/app/governance" />
      <Table path="/app/industries" />
      <Table path="/app/infrastructure" />
      <Table path="/app/iot" />
      <Table path="/app/james" />
      <Table path="/app/java" />
      <Table path="/app/jeremy" />
      <Table path="/app/management-tools" />
      <Table path="/app/marketplace" />
      <Table path="/app/media" />
      <Table path="/app/messaging" />
      <Table path="/app/ml" />
      <Table path="/app/mobile" />
      <Table path="/app/modernizing" />
      <Table path="/app/networking" />
      <Table path="/app/newsblog" />
      <Table path="/app/open-source" />
      <Table path="/app/public-sector" />
      <Table path="/app/robotics" />
      <Table path="/app/sap" />
      <Table path="/app/security" />
      <Table path="/app/security-bulletins" />
      <Table path="/app/serverless" />
      <Table path="/app/storage" />
      <Table path="/app/training" />
      <Table path="/app/werner" />
      <Table path="/app/whats-new" />
      <Table path="/app/yan" />
    </Router>
)

export default App
