import React from 'react';
import fetch from 'isomorphic-fetch';
import Async from 'react-async';
import {Component} from 'react';
import prettyms from 'pretty-ms';

// load the url with aws blog articles from s3
const loadurl = async () =>
  fetch('https://rssblog.s3-eu-west-1.amazonaws.com/out.json')
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

class AWS extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <div>
      <Async promiseFn={loadurl}>
      <Async.Loading>Loading...</Async.Loading>
      <Async.Fulfilled>
        {data => {
          return (
            <table>
              <thead>
                <tr>
                  <th>Age</th>
                  <th>Blog</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {data.content.map(content=> {

                  // calculate the age of the post
                  var now = new Date();
                  var timestamp = now.getTime() - (content.timest * 1000);
                  var timediff = prettyms(timestamp, {compact: true});

                  return (
                    <tr key = {content.link}>
                      <td>{timediff}</td>
                      <td>{content.source}</td>
                      <td><a target = "_blank" rel = "noreferrer" href = {content.link}><center><b>{content.title}</b></center></a><br />{content.desc}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>   
        )}}
        </Async.Fulfilled>
        <Async.Rejected>
          {error => `Something went wrong: ${error.message}`}
        </Async.Rejected>
      </Async> 
    </div>  
  };
};

export default AWS;
