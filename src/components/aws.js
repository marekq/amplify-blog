import React from 'react';
import Async from 'react-async';
import FilterableTable from 'react-filterable-table';

const url = 'https://feed.marek.rocks/all.json'

// fields to show in the table
const fields = [
	{ name: 'timest', visible: false },
	{ name: 'datestr', displayName: "Date", visible: true },
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
			return (
				<div>
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
 
 
 