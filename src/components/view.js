import React from "react"
import styles from "./css/view.module.css"
import Header from "./header"

const View = ({ title, children }) => (
  <div>
    <section className = {styles.view}>
      <Header />
      {children}
    </section>
  </div>

)

export default View
