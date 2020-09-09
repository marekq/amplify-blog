import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  let header
  let menu

  header = (
    <h1 style={{
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
        marginTop: 0,
        textAlign: "center",
      }}>
      <Link style={{
          boxShadow: `none`,
        }}
        to={`/`}>
        AWS Blog
      </Link>
      {` • `}
      <Link style={{
          boxShadow: `none`,
        }}
        to={`/about`}>
        About
      </Link>
      {` • `}
      <Link style={{
          boxShadow: `none`,
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
        padding: '5%',
      }}
    >
      <header>
        {header}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous"></link>
      </header>
      <main>
        {menu}{children}
      </main>
      <footer>
        Find the source code for this page on 
        {` `}
        <a href = "https://github.com/marekq/amplify-blog">GitHub</a>.
      </footer>
    </div>
    </center>

  )
}

export default Layout
