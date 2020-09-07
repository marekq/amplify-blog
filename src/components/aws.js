import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import FilterableTable from 'react-filterable-table';

// Fields to show in the table, and what object properties in the data they bind to
const fields = [
	{ name: 'title', displayName: "Title", inputFilterable: true, sortable: true },
	{ name: 'source', displayName: "Blog", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'desc', displayName: "Description", inputFilterable: true, exactFilterable: true, sortable: true }
];

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
          <FilterableTable
            namespace = "blogs"
            initialSort = "timest"
            data = {this.state.data}
            fields = {fields}
            noRecordsMessage = "There are no blogs to display"
            noFilteredRecordsMessage = "No blogs match your filters"
          />
        </tbody>
      </table>  
    </div>
    )};
};
