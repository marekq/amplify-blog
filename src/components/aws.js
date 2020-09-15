import React from 'react';
import Async from 'react-async';
import FilterableTable from 'react-filterable-table';
import prettyMilliseconds from 'pretty-ms';
import Button from '@material-ui/core/Button';

const url = 'https://feed.marek.rocks/all.json'

// fields to show in the table
const fields = [
	{ name: 'timest', visible: false },
	{ name: 'datestr', displayName: "Age", visible: true },
	{ name: 'blogsource', displayName: "Blog", inputFilterable: true, exactFilterable: false, sortable: true },
	{ name: 'title', displayName: "Title", inputFilterable: true, exactFilterable: false, sortable: true },
	{ name: 'description', displayName: "Description", inputFilterable: true, exactFilterable: false },
	{ name: 'link', inputFilterable: false, visible: false }
];

const loadUsers = () =>
  fetch(url)
	.then(res => (res.ok ? res : Promise.reject(res)))
	.then(res => res.json())

function App() {
	return (
	  	<div className="container">
		<Async promiseFn={loadUsers}>
		<Async.Loading>Loading...</Async.Loading>
		<Async.Fulfilled>
			{data => {
				
				// get the current time
				var now = new Date().getTime();
				var categories = [];

				// convert the unix timestamp of the blog to a timediff string
				data.map(function(blog, index){
					
					// get the time difference in seconds
					var timestamp = now - (blog.timest * 1000);

					// get the time difference string and set it in data
					var timediff = prettyMilliseconds(timestamp, {compact: true});
					blog.datestr = timediff;

					// add the blog source to the categories array for link generation
					categories.indexOf(blog.blogsource) === -1 ? categories.push(blog.blogsource) : console.log("This item already exists");
					
				});

				const menu = [];

				for (const [index, value] of categories.sort().entries()) {
					menu.push(<Button size = "small" variant = "outlined" disableElevation key={index} href={value}>{value}</Button>)
				}

				return (
					<div>
						{menu}
						<br /><br />
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

export default App;
