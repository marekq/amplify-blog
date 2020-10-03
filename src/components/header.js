import React from "react"
import { Link } from "gatsby"
import styles from "./css/header.module.css"

// create refresh page function
function refreshPage() {
  window.location.render(true);
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
        <Link to="/app/aws/all" className={styles[`header__link`]} onClick = {refreshPage}>
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
