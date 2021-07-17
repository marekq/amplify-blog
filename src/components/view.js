import React from "react"
import * as styles from "./css/view.module.css"
import Header from "./header"

const View = ({ title, children }) => (
  <div style = {{backgroundColor: this.state.isDarkMode ? "darkblue" : "#f4f4f4"}}>
    <section className = {styles.view}>
      <Header />
      {children}
    </section>
  </div>

)

export default View
