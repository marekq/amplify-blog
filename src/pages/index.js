import React from "react"
import AWS from "../components/aws"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ location }) => {

  return (
    <Layout location={location} title="Serverless Blog">
      <SEO title="All posts" />
      <AWS />
    </Layout>
  )
}

export default BlogIndex
