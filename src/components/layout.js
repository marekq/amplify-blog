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
    <center>

    <div
      style={{
        maxWidth: '1000px',
        padding: '5%',
      }}
    >
      <header>{header}</header>
      <main>
        {menu}{children}
      </main>
      <footer>
        © {new Date().getFullYear()}, Find the source code for this page on 
        {` `}
        <a href = "https://github.com/marekq/amplify-blog">GitHub</a>.
      </footer>
    </div>
    </center>

  )
}

export default Layout
