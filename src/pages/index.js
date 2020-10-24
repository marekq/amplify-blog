import React from "react";
import View from "../components/view";
import Header from "../components/header";
import Helmet from 'react-helmet';
import { Link } from "gatsby";

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
            Welcome to marek.rocks
          </h2>
          <br />
          <p>
            You can find a few of the AWS blogs below; 
          </p>
          <table>
            <tr>
              <td><Link to = "/app/all"> All Blogs </Link>{' ◦ '}</td>
              <td><Link to = "/app/compute"> Compute </Link>{' ◦ '}</td>
              <td><Link to = "/app/whats-new"> What's New </Link>{' ◦ '}</td>
              <td><Link to = "/app/ml" >ML </Link>{' ◦ '}</td>
              <td><Link to = "/app/developer">Deverlopers</Link></td>
            </tr>
          </table>      
        </center>
    </div>
  </View>
)

export default Index
