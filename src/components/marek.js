import React from "react"
import View from "./view.js"
import Header from "../components/header"
import Resume from "react-awesome-resume"
import { person } from './resume';

import 'semantic-ui-css/semantic.min.css';

const Marek = () => {

  return (
    <View title = "">  
      <Header /> 
      <div className = "container"> 
        <center>
          <Resume jsonResume = {person} inline = {true} theme = "default" />
        </center>
      </div>
   </View>
  )
}

export default Marek
