import React from "react"
import View from "./view"
import Header from "../components/header"

const About = () => {

  return (
    <View title = "">
      <Header />
      <div className = "container">
      <center>
        <h1>About this page</h1><br />
        <p>This page was built using AWS Amplify, which is a serverless web development platform created by AWS. The frontend code was created with Gatsby and is deployed to a managed web distribution by Amplify. The blog post entries on the main page are retrieved from a public S3 bucket which contains a JSON file with the content. A Lambda function runs periodically to retrieve the blogposts from a DynamoDB table. </p>
      </center>
      </div>
    </View>
  )
}

export default About
