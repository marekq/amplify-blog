import React from "react"
import { Link } from "gatsby"
import styles from "./css/header.module.css"
import "./css/bootstrap.min.css"

const Header = () => (
  <header className = {styles.header}>
    <div className = {styles[`header__wrap`]}>
      <nav role="main" className={styles[`header__nav`]}>
        <Link to="/" key = "home" className={styles[`header__link`]}>
          HOME
        </Link>
        <Link to="/app/all" key = "all" className={styles[`header__link`]}>
          BLOG
        </Link>
        <Link to="/app/marek" key = "marek" className={styles[`header__link`]}>
          MAREK
        </Link>
        <Link to="/app/about" key = "about" className={styles[`header__link`]}>
          ABOUT
        </Link>
      </nav>
    </div>
  </header>
)

export default Header
