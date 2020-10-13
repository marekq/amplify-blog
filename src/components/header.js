import React from "react"
import { Link } from "gatsby"
import styles from "./css/header.module.css"
import bootstrap from "./css/bootstrap.min.css"

const Header = () => (
  <header className={styles.header}>
    <link rel="stylesheet" href={bootstrap} />

    <div className={styles[`header__wrap`]}>
      <nav role="main" className={styles[`header__nav`]}>
        <Link to="/" className={styles[`header__link`]}>
          Home
        </Link>
        <Link to="/app/all" className={styles[`header__link`]}>
          Blog
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
