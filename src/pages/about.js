import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"

const AboutIndex = ({ location }) => {

  return (
    <Layout location={location} title="Serverless Blog">
      <SEO title="About" />
      <h2>About</h2>
      <p>Welcome to the the About page.</p>
    </Layout>
  )
}

export default AboutIndex
