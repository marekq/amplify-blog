import React from 'react';
import {Component} from 'react';
import prettyms from 'pretty-ms';
import axios from 'axios';

export default class AWS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  // load the url with aws blog articles from s3
  async getData() {
    const resp = await axios.get('https://rssblog.s3-eu-west-1.amazonaws.com/out.json')
    var data = resp.data
    this.state.data = resp.data.content;
    console.log("getdata", data);
    return data;
  }

  // mount the component before render
  async componentDidMount() {
    this.setState(await this.getData())
  }

  // render the page
  render() {  
    return (
    <div>
      <table>
        <tbody>
          {this.state.data.map(content => {

            // calculate the age of the post
            var now = new Date();
            var timestamp = now.getTime() - (content.timest * 1000);
            var timediff = prettyms(timestamp, {compact: true});
            var sourcename = content.source.replace('-', ' ');
            var ddbkey = content.source + content.timest;

            // return table values
            return (
              <tr key = {ddbkey}>
                <td>
                  <button className = "collapsible">{content.source} - {content.title}</button>
                  <div className = "content"><br />
                    <p id = "desc">
                      <i>{timediff} ago in {sourcename} by {content.author}</i><br /><br />
                        {content.desc}<br /><br />
                        <a target = "_blank" rel = "noreferrer" href = {content.link}>Visit article here</a>

                    </p>
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
