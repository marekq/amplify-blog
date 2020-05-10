import React from 'react';
import fetch from 'isomorphic-fetch';

const eventsData = [];

fetch('https://rssblog.s3-eu-west-1.amazonaws.com/out.json')
      .then(data => data.json())
      .then(data => {
        eventsData.push(...data.content);
      });

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
      {eventsData.map((data, index) => {
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
