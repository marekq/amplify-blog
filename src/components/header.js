import React from "react"
import { Link } from "gatsby"
import styles from "./css/header.module.css"

function refreshPage() {
  console.log(this.props1)
}

const Header = () => (
  <header className={styles.header}>
    <div className={styles[`header__wrap`]}>
      <h2>
        <Link
          to="/"
          className={styles[`header__link`]}
        >
          Home
        </Link>
      </h2>
      <nav role="main" className={styles[`header__nav`]}>
        <Link to="/app/all" onClick = {refreshPage} className={styles[`header__link`]}>
          AWS Blog
        </Link>
        <Link to="/app/marek" className={styles[`header__link`]}>
          Marek
        </Link>
        <Link to="/app/about" className={styles[`header__link`]}>
          About
        </Link>
      </nav>
    </div>
  </header>
)

export default Header
