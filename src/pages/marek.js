import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"

const AboutIndex = ({ location }) => {

  return (
    <Layout location={location} title="Serverless Blog">
      <SEO title="Marek Kuczynski" />
      <h2>Marek Kuczynski</h2>
      <p>Marek is a Serverless Solutions architect at AWS based out of The Netherlands.</p>
    </Layout>
  )
}

export default AboutIndex
