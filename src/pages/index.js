import React from "react"
import AWS from "../components/aws"
import Layout from "../components/layout"

const Index = ({ location }) => {

  return (
    <Layout location = {location} title = "Serverless Blog">
      A serverless blog built by Marek Kuczynski, powered by AWS Amplify.<br /><br />
      <AWS />
    </Layout>
  )
}

export default Index
