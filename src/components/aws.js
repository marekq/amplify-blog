import React from 'react';
import {Component} from 'react';
import prettyms from 'pretty-ms';
import axios from 'axios';
import "./style.css";

export default class AWS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  // load the url with aws blog articles from s3
  async componentDidMount() {
    try {
      const resp = await axios.get('https://rssblog.s3-eu-west-1.amazonaws.com/out.json')
      this.state.data = resp.data.content;
      console.log(resp.data.content);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
    <div>
      <table>
        <thead>
          <tr>
          <th><button>Toggle</button></th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(content => {

            // calculate the age of the post
            var now = new Date();
            var timestamp = now.getTime() - (content.timest * 1000);
            var timediff = prettyms(timestamp, {compact: true});
            var sourcename = content.source.replace('-', ' ');
            var ddbkey = content.source + content.timest;

            return (
              <tr key = {ddbkey}>
                <td>
                <a target = "_blank" rel = "noreferrer" href = {content.link}><b>{content.title}</b></a><br />
                <div>
                <i>{timediff} ago in {sourcename} by {content.author}</i><br />
                  {content.desc}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>  
    </div>
    )};
};

//export default AWS;
