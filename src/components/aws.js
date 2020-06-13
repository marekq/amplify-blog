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
                <th>'{ }'</th>
                </tr>
              </thead>
              <tbody>
                {data.content.map(content=> {

                  // calculate the age of the post
                  var now = new Date();
                  var timestamp = now.getTime() - (content.timest * 1000);
                  var timediff = prettyms(timestamp, {compact: true});
                  var sourcename = content.source.replace('-', ' ');
                  var ddbkey = content.source + content.timest;

                  return (
                    <tr key = {ddbkey}>
                      <td>
                        <button className = "collapsible">{content.title}</button>
                        <div className = "content">
                          <p id = "desc">
                            <a target = "_blank" rel = "noreferrer" href = {content.link}><b>{content.title}</b></a><br />
                            <i>{timediff} ago in {sourcename} by {content.author}</i><br />
                            {content.desc}
                          </p>
                        </div>
                      </td>
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
