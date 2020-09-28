import React from "react"
import { Helmet } from "react-helmet"
import Header from "./header.js"

import "./css/global.css"
import styles from "./css/main.module.css"

const Layout = ({ children }) => (
  <div>
    <Helmet title="Serverless Blog" />
    <Header />
    <main className={styles.main}>{children}</main>
  </div>
)

export default Layout
