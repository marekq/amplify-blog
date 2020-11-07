import React from "react"
import View from "./view.js"
import { Card } from 'react-bulma-components'

const About = () => {
  
  return (
    <View title = "">
      <Card>
        <center>
          <br />
          <section className = "hero"><h1 className = "title">About this page</h1></section>
            <br /><br />
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
      </Card>
    </View>
  )
}

export default About
