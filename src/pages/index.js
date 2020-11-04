import React from "react";
import View from "../components/view";
import Header from "../components/header";
import Helmet from 'react-helmet';

// set page title
var pageTitle = 'Serverless Blog';

const Index = () => (
  <View>
    <Header />
    <Helmet>
        <title>{pageTitle}</title>
    </Helmet>
    <div id = "container">
        <br />
        <center>
          <h2>
            Hello!
          </h2>
          <br />
          <p>
            Welcome the personal page of Marek Kuczynski, a Serverless Solutions Architect at AWS.
          </p>
          <br />
          <p>
            <img src = './amplify.png' alt = "Architecture" width = "100%" />
          </p>
          <br />
          <p>
            This page is hosted on AWS Amplify and retrieves blog posts from JSON objects stored on S3. On the backend, a Step Function retieves AWS blogs every few minutes and stores the output on S3 and in DynamoDB.
          </p>    
          <p>
            Take a look at the "blog" category above to see all recent AWS blog posts. You can also read more about Marek Kuczynski or about how this page was built. 
          </p>
        </center>
    </div>
  </View>
)

export default Index
