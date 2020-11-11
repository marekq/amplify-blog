import React from "react";
import View from "../components/view";
import Helmet from 'react-helmet';
import styles from "../components/css/header.module.css"
import { Card } from 'react-bulma-components'

// set page title
var pageTitle = 'Serverless Blog';

const Index = () => (
    <View title = ''>
      <Helmet>
          <title>{pageTitle}</title>
      </Helmet>
      <Card>
        <div className = {styles[`text__div`]}>
          <br />
            <p>
              Welcome the personal page of Marek Kuczynski, a Serverless Solutions Architect at AWS.
            </p>
            <br />
            <img src = {'/architecture.png'} alt = "Architecture" width = "100%" />
            <br />
            <p>
              This page is hosted on AWS Amplify and retrieves blog posts from JSON objects stored on S3. On the backend, a Step Function retieves AWS blogs every few minutes and stores the output on S3 and in DynamoDB.
            </p>  
            <br />  
            <p>
              Take a look at the "blog" category above to see all recent AWS blog posts. You can also read more about Marek Kuczynski or about how this page was built. 
            </p>
        </div>      
      </Card>
      <br /><br /><br /><br /><br /><br />
    </View>
)

export default Index
