import React from 'react';
import Async from 'react-async';
import FilterableTable from 'react-filterable-table';
import prettyMilliseconds from 'pretty-ms';
import fetch from 'node-fetch';

const url = 'https://feed.marek.rocks/'


// fields to show in the table
const fields = [
	{ name: 'timest', visible: false },
	{ name: 'datestr', displayName: "Age", visible: true },
	{ name: 'blogsource', displayName: "Blog", inputFilterable: true, exactFilterable: false, sortable: true },
	{ name: 'title', displayName: "Title", inputFilterable: true, exactFilterable: false, sortable: true },
	{ name: 'description', displayName: "Description", inputFilterable: true, exactFilterable: false },
	{ name: 'link', inputFilterable: false, visible: false }
];

const loadBlogs = ({ blogUrl }) =>
  fetch(blogUrl)
	.then(res => (res.ok ? res : Promise.reject(res)))
	.then(res => res.json())

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { url1: url + props.blog + '.json', blog1: 'all', props1: props.blog };
	}

	render() {
		return (
			<div className = "container" width = "1200px">
				
				<Async promiseFn = {loadBlogs} blogUrl = {this.state.url1}>
				<Async.Loading>Loading... </Async.Loading>
				<Async.Fulfilled>
					{data => {
						
						// get the current time
						var now = new Date().getTime();

						// convert the unix timestamp of every blog to a timediff string
						data.map(function(blog, index){
							
							// get the time difference in seconds
							var timestamp = now - (blog.timest * 1000);

							// get the time difference string and set it in data
							var timediff = prettyMilliseconds(timestamp, {compact: true});
							blog.datestr = timediff;

						});

						return (
							<div>
								Getting {this.state.url1} {this.state.blog1} <br />
								<FilterableTable
									namespace="blogs"
									topPagerVisible={true}
									pagersVisible={false}
									headerVisible={true}
									initialSort="timest"
									initialSortDir={false}
									data={data}
									fields={fields}
									noRecordsMessage="There are no blogs to display"
									noFilteredRecordsMessage="No blogs match your filters"
									recordCountName="blog"
									recordCountNamePlural="blogs"
								/>
							</div>
						)}}
					</Async.Fulfilled>
					<Async.Rejected>
						{error => `Something went wrong: ${error.message}`}
					</Async.Rejected>
				</Async>
			</div>
		);
	}
}

export default App;
