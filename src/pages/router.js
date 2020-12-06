import React from "react";
import { Router } from "@reach/router";
import Blog from "../components/aws";
import FourZeroFour from "./404.js";
import View from "../components/view";
import Marek from "../components/marek";
import About from "../components/about";

const RouterPage = () => (
  <View title = "">
    <Router>
      <Blog path = "/">
        <Marek path = "marek/" />
        <About path = "about/" />
        <Blog path = "blog/" />
        <Blog path = "blog/*" />
      </Blog>
      <FourZeroFour default />
    </Router>
  </View>
)

export default RouterPage
