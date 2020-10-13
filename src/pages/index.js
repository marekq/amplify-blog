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
          <h3><u>Marek's serverless blog</u></h3>
          <br />
          <p>Welcome to my serverless blog.</p>
          <p>Please select one of the menu options above to continue.</p>
        </center>
    </div>
  </View>
)

export default Index
