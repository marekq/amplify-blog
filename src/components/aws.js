import React from 'react'
import jquery from 'jquery'

const eventsData = jquery.getJSON('https://rssblog.s3-eu-west-1.amazonaws.com/out.json')
console.log(eventsData)

const AWS = props => (
  <div id="main">
  <table>
    <thead>
      <tr>
        <th>Source</th>
        <th>Title</th>
        <th>Date</th>
        <th>Author</th>
      </tr>
    </thead>
    <tbody>
      {eventsData.content.map((data, index) => {
        return (
          <tr>
            <td>{data.source}</td>
            <td>{data.title}</td>
            <td>{data.timest}</td>
            <td>{data.author}</td>
          </tr>
        )
      })}
    </tbody>
  </table>    
  </div>  
)

export default AWS
