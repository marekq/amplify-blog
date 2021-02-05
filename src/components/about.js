import React from "react";
import styles from "../components/css/header.module.css";
import Card from 'react-bootstrap/Card';

const About = () => {
  
  return (
    <div className = {styles[`text__div`]}>
      <center>
        <Card style={{ paddingInline: '1em' }}>
          <br />
          <b className = "title">About this page</b>
          <br /><br />
          Welcome the personal page of Marek Kuczynski, a Serverless Solutions Architect at AWS. You can read the latest AWS blogposts on this page or learn more about Marek.
          <br /><br />
            This page was built using AWS Amplify, which is a serverless web development platform created by AWS. The frontend code was created with Gatsby and is deployed to a managed web distribution by Amplify. You can find the sourcecode for the webpage on <a href = "https://github.com/marekq/amplify-blog">GitHub.</a><br /> 
            The blog post entries on the main page are retrieved from a GraphQL API deployed through AppSync. For text search, the Algolia online service is used.
          <br /><br />
            <img src = {'/architecture.png'} width = "100%" alt = "X-Ray overview" />
          <br /><br />
            AWS Step Functions is triggered to periodically retrieve the latest blog posts.
          <br /><br />
            <center> 
              <img src = {'/statemachine.png'} width = "200px" alt = "State Machine overview" />
            </center>
          <br /><br />
            The code of the backend can be found <a href = "https://github.com/marekq/rss-lambda">here.</a>. 
        </Card>
      </center>
    </div>
  )
}

export default About
