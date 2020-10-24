import React from "react"
import View from "../components/view"
import Header from "../components/header"
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
          <h2>Welcome to my serverless blog!</h2>
          <br />
          <p>
            You can find recent AWS blogs on this page, read more about how it was build or learn more about Marek. 
          </p>
          <p>
            This page is hosted by AWS Amplify and you can find the full sourcecode for the page on <a href = "https://github.com/marekq/amplify-blog">GitHub</a>. The code used by the backend can be found <a href = "https://github.com/marekq/rss-lambda">here</a>. 
          </p>
        </center>
    </div>
  </View>
)

export default Index
