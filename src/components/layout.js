import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  let menu

  header = (
    <h1 style={{
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 10,
        fontColor: "gray",
        textAlign: "center",
      }}>
      <Link style={{
          boxShadow: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
      {title}
      </Link>
    </h1>
  )

  menu = (
      <h3 style={{
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 0,
        textAlign: "center",
        fontColor: "#CCCCCC",
        fontWeight: 0,
      }}>
      <Link style={{
          boxShadow: `none`,
          color: `inherit`,
        }}
        to={`/`}>
      Home
      </Link>
      {` `}
      <Link style={{
          boxShadow: `none`,
          color: `inherit`,
        }}
        to={`/about`}>
      About
      </Link>
     </h3>
  )
  
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{menu}
        {children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a> and {` `}
        <a href="https://aws.amazon.com/amplify/">AWS Amplify</a>.
      </footer>
    </div>
  )
}

export default Layout
