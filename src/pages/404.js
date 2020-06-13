import React from "react"

import Layout from "../components/layout"

const NotFoundPage = ({ data, location }) => {

  return (
    <Layout location={location} title="Serverless Blog">
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage
