import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  let header
  let menu

  header = (
    <h1 style={{
        fontFamily: `Candara, sans-serif`,
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
        fontFamily: `Candara, sans-serif`,
        marginTop: 0,
        textAlign: "center",
        color: "gray"
      }}>
      <Link style={{
          boxShadow: `none`,
          color: `gray`,
        }}
        to={`/`}>
      Home
      </Link>
      {` • `}
      <Link style={{
          boxShadow: `none`,
          color: `gray`,
        }}
        to={`/aws`}>
      AWS feed
      </Link>
      {` • `}
      <Link style={{
          boxShadow: `none`,
          color: `gray`,
        }}
        to={`/about`}>
      About
      </Link>
      {` • `}
      <Link style={{
          boxShadow: `none`,
          color: `gray`,
        }}
        to={`/marek`}>
      Marek
      </Link>
     </h3>
  )
  
  return (
    <div
      style={{
        maxWidth: '100%',
        padding: '5%',
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
