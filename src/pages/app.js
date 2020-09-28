import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import About from "../components/about"
import AWS from "../components/aws"
import Marek from "../components/marek"


const App = () => (
  <Layout>
    <Router>
      <About path="/app/about" />
      <AWS path="/app/aws" />
      <Marek path="/app/marek" />
    </Router>
  </Layout>
)

export default App
