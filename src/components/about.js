import React from "react"
import View from "./view"

const About = () => {

  return (
    <View title = "">
      <center>
        <h1 class="display-3">About this page</h1>
        <p>This page was built using AWS Amplify, which is a serverless web development platform created by AWS. The frontend code was created with Gatsby and is deployed to a managed web distribution by Amplify. The blog post entries on the main page are retrieved from a public S3 bucket which contains a JSON file with the content. A Lambda function runs periodically to retrieve the blogposts from a DynamoDB table. </p>
      </center>
    </View>
  )
}

export default About