import React from "react"
import Layout from "../components/layout"

const AboutIndex = ({ location }) => {

  return (
    <Layout location={location} title="Serverless Blog">
      <h2>About</h2>
      <p>This page was built using AWS Amplify, which is a serverless web development platform created by AWS. The frontend code was created with Gatsby and is deployed to a managed web distribution by Amplify. The blog post entries on the main page are retrieved from a public S3 bucket which contains a JSON file with the content. A Lambda function runs periodically to retrieve the blogposts from a DynamoDB table. </p>
    </Layout>
  )
}

export default AboutIndex
