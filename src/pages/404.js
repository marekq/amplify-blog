import React from "react"
import View from "../components/view"
import Header from "../components/header"

const NotFound = () => (
    <View title="">
      <Header />
      <center>
        <h1 className = "display-6">404</h1>
        <p>You just hit a route that doesn&#39;t exist... </p>
      </center>
    </View>
)

export default NotFound
