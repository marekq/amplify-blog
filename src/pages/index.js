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
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"></link>
      </Helmet>
      A serverless blog built by Marek Kuczynski, powered by AWS Amplify.<br /><br />
      <AWS />
    </Layout>
  )
}

export default Index
