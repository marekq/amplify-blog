import React from "react"
import PropTypes from "prop-types"
import styles from "./css/view.module.css"
import Header from "./header"

const View = ({ title, children }) => (
  <div>
    <section className={styles.view}>
      <h1 className={styles[`view__heading`]}>{title}</h1>
      <Header />
      {children}
    </section>
  </div>

)

View.propTypes = {
  title: PropTypes.string.isRequired,
}

export default View
