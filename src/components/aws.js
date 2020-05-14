import React from 'react';
import fetch from 'isomorphic-fetch';
import Async from 'react-async';
import moment from 'moment-timezone';

// load the url with aws blog articles from s3
const loadurl = async () =>
  fetch('https://rssblog.s3-eu-west-1.amazonaws.com/out.json')
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

function App() {
  return (
    <div>
      <Async promiseFn={loadurl}>
      <Async.Loading>Loading...</Async.Loading>
      <Async.Fulfilled>
        {data => {
          return (
            <table>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {data.content.map(content=> {
                  // guess the users timezone
                  var usertz = moment.tz.guess();

                  // convert the blogpost article to datetime
                  var userdate = Intl.DateTimeFormat('en-US',{
                    timeZone: usertz,
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(content.timest * 1000);

                  return (
                    <tr key = {content.timest}>
                      <td>{content.source}</td>
                      <td title = {userdate} ><a target = "_blank" rel = "noreferrer" href = {content.link}>{content.title}</a></td>
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
  )
};

export default App;
