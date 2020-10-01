import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import About from "../components/about"
import AWS from "../components/aws"
import Marek from "../components/marek"

const NotFound = () => <p>Sorry, nothing here</p>

const App = () => (
  <Layout>
    <Router>
      <NotFound default />
      <About path="/app/about" />
      <Marek path="/app/marek" />
      <AWS path="/app/aws/:blog" />
    </Router>
  </Layout>
)

export default App
