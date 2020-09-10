import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import FilterableTable from 'react-filterable-table';

const url = 'https://feed.marek.rocks/all.json'

// fields to show in the table
const fields = [
	{ name: 'timest', visible: false },
	{ name: 'datestr', visible: false },
	{ name: 'source', displayName: "Blog", inputFilterable: true, exactFilterable: false, sortable: true },
	{ name: 'title', displayName: "Title", inputFilterable: false, exactFilterable: false, sortable: true },
	{ name: 'desc', displayName: "Description", inputFilterable: false },
	{ name: 'link', inputFilterable: false, visible: false }
];

// main component
export default class AWS extends Component {

	// define constructor and load data
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};
		this.getData();
	}

	// load the url with aws blog articles from s3
	async getData() {

		const resp = await axios.get(url)
		this.state.data = resp.data.content
	}

  	// render the page
  	render() {

		// check if a window is present to prevent 'gatsby build' issues
		if (typeof window !== 'undefined') {

			// return filtertable
			return (
		
				<div>
					<FilterableTable
						namespace="blogs"
						topPagerVisible={true}
						pagersVisible={false}
						headerVisible={true}
						initialSort="timest"
						initialSortDir={false}
						data={this.state.data}
						fields={fields}
						noRecordsMessage="There are no blogs to display"
						noFilteredRecordsMessage="No blogs match your filters"
						recordCountName="blog"
						recordCountNamePlural="blogs"
					/>
				</div>
			)

		} else {

			// return empty page
			return (
				<div />
			)
		}
	}
};
