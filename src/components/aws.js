import React from 'react';
import {Component} from 'react';
import fetch from 'isomorphic-fetch';

class AWS extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async loadurl() {
    const response = await fetch('https://rssblog.s3-eu-west-1.amazonaws.com/out.json');
    const json = await response.json();
    console.log(json);
    this.setState = { data: json };
    return json;
  }

  render() { 
    this.loadurl();
    return (
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
          {this.state.map(content => {
            return (
              <tr>
                <td>{content.source}</td>
                <td>{content.title}</td>
                <td>{content.timest}</td>
                <td>{content.author}</td>
              </tr>
            )
          })}
        </tbody>
      </table>    
      </div>  
    );
  }
}

export default AWS;
