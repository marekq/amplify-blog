import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import FilterableTable from 'react-filterable-table';

// Fields to show in the table, and what object properties in the data they bind to
const fields = [
	{ name: 'timest', visible: false },
	{ name: 'datestr', visible: false },
	{ name: 'blogsource', displayName: "Blog", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'title', displayName: "Title", inputFilterable: true, exactFilterable: true, sortable: true },
	{ name: 'desc', displayName: "Description", inputFilterable: true},
	{ name: 'link', inputFilterable: false, visible: false}
];

const isBrowser = () => typeof(window) !== "undefined";

export default class AWS extends Component {

  constructor(props) {
    super(props);
    this.state = {
			data: []
    };
  }

  // load the url with aws blog articles from s3
  async getData() {
		const url = 'https://feed.marek.rocks/all.json'
    const resp = await axios.get(url)
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
		if (isBrowser()) {  
			return (
			<div>
				<table>
					<tbody>
						<FilterableTable
							namespace="blogs"
							topPagerVisible={false}
							pagersVisible={false}
							headerVisible={true}
							pageSize="10000"
							initialSort="timest"
							initialSortDir={false}
							data={this.state.data}
							fields={fields}
							noRecordsMessage="There are no blogs to display"
							noFilteredRecordsMessage="No blogs match your filters"
							recordCountName="blog"
							recordCountNamePlural="blogs"
						/>
					</tbody>
				</table>  
			</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
};
