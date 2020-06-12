import React from "react"
import AWS from "../components/aws"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ location }) => {

  return (
    <Layout location={location} title="Serverless Blog">
      <SEO title="All posts" />
      A serverless blog built by Marek Kuczynski powered by AWS Amplify. 
      <AWS />
    </Layout>
  )
}

export default BlogIndex
