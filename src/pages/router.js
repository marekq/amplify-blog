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
      <Blog path="/" default>
        <Marek path="marek" />
        <About path="about" />
        <Blog path="blog" />
      </Blog>
    </Router>
  </View>
)

export default RouterPage
