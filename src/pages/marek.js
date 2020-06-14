import React from "react"
import Layout from "../components/layout"

const AboutIndex = ({ location }) => {

  return (
    <Layout location={location} title="Serverless Blog">
      <h2>Marek Kuczynski</h2>
      <img src = "./mk.jpg" width = "250" alt = "Marek" />
      <p>Marek Kuczynski is a Senior Serverless Solutions Architect at Amazon Web Services in The Netherlands. He has been with the company for 3.5 years and worked with enterprise and startup customers before working fulltime on serverless. Marek mostly develops using containers and Lambda functions on AWS, where he enjoys working with Golang and Python most. He also helps to co-organize the ServerlessDays meetup and conference in The Netherlands and speaks regularly at various other meetups.</p>
      <p>Connect with Marek on <a href = "https://twitter.com/marekq">Twitter</a>, <a href="https://github.com/marekq/">GitHub</a> or <a href="https://www.linkedin.com/in/marekkuczynski/">LinkedIn</a>.</p>.
    </Layout>
  )
}

export default AboutIndex
