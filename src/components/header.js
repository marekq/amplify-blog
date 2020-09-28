import React from "react"
import { Link } from "gatsby"
import styles from "./css/header.module.css"

const Header = () => (
  <header className={styles.header}>
    <div className={styles[`header__wrap`]}>
      <h1 className={styles[`header__heading`]}>
        <Link
          to="/"
          className={`${styles[`header__link`]} ${
            styles[`header__link--home`]
          }`}
        >
          Serverless Blog
        </Link>
      </h1>
      <nav role="main" className={styles[`header__nav`]}>
        <Link to="/app/aws" className={styles[`header__link`]}>
          AWS Blog
        </Link>
        <Link to="/app/about" className={styles[`header__link`]}>
          About
        </Link>
        <Link to="/app/marek" className={styles[`header__link`]}>
          Marek
        </Link>
      </nav>
    </div>
  </header>
)

export default Header
