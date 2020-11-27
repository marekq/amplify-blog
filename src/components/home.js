import React from "react";
import styles from "./css/header.module.css";
import { Card } from 'react-bulma-components';

const Index = () => (
    <div className = {styles[`text__div`]}>
      <Card>
        <div className = {styles[`text__div`]}>
          <p>
            <br />
            Welcome the personal page of Marek Kuczynski, a Serverless Solutions Architect at AWS.
          </p>
          <br />
          <img src = {'/amplify.png'} alt = "Architecture" width = "100%" />
          <br />
          <p>
            This page is hosted on AWS Amplify and retrieves blog posts from JSON objects stored on S3. On the backend, a Step Function retieves AWS blogs every few minutes and stores the output on S3 and in DynamoDB.
          </p>  
          <br />  
          <p>
            Take a look at the "blog" category above to see all recent AWS blog posts. You can also read more about Marek Kuczynski or about how this page was built. 
          </p>
        </div>
        <br /><br />      
      </Card>
      <div style = {{height: "250px"}}><br /></div>
    </div>
)

export default Index
