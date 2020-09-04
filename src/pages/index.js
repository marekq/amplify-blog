import React from "react"
import AWS from "../components/aws"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import { withPrefix } from "gatsby"

const Index = ({ location }) => {

  return (
    <Layout location = {location} title = "Serverless Blog">
      <Helmet async={false}>
          <script src={withPrefix('click.js')} type="text/javascript" />
          <script src={withPrefix('collapse.js')} type="text/javascript" />
      </Helmet>
      A serverless blog built by Marek Kuczynski, powered by AWS Amplify.<br /><br />
      <AWS />
    </Layout>
  )
}

export default Index
