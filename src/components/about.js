import React from "react"
import View from "./view.js"
import Header from "../components/header"

const About = () => {

  return (
    <View title = "">
      <Header />
      <div className = "container">
      <center>
        <h1>About this page</h1>
          <br />
            This page was built using AWS Amplify, which is a serverless web development platform created by AWS. The frontend code was created with Gatsby and is deployed to a managed web distribution by Amplify. You can find the sourcecode for the webpage on <a href = "https://github.com/marekq/amplify-blog">GitHub</a>.
          <br /><br />
            <img src = {'/architecture.png'} width = "100%" alt = "X-Ray overview" />
          <br /><br />
            The blog post entries on the main page are retrieved from a public S3 bucket which contains a JSON file with the blog content. A Lambda function runs periodically to retrieve the blogposts from RSS feeds and to update the JSON output. 
          <br /><br />
            <img src = {'/statemachine.png'} height = "50%" alt = "State Machine overview" />
          <br /><br />
            The code of the backend can be found <a href = "https://github.com/marekq/rss-lambda">here</a>. 
      </center>
      </div>
    </View>
  )
}

export default About
