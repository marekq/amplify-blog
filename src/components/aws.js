import React from 'react';
import Async from 'react-async';
import FilterableTable from 'react-filterable-table';
import prettyMilliseconds from 'pretty-ms';
import fetch from 'node-fetch';
import { Link } from "gatsby";

const url = 'https://feed.marek.rocks/'

const loadBlogs = ({ blogUrl }) =>
  fetch(blogUrl)
	.then(res => (res.ok ? res : Promise.reject(res)))
	.then(res => res.json())

class App extends React.Component {

	constructor(props) {
		super(props);

		// to be improved - get the uri of the url by stripping /app from the url
		var bloguri = props.path.slice(5, 999);
		this.state = { url1: url + bloguri + '.json' };
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

							// add link for blogsource to blog category url
							var blogurl = `/app/${blog.blogsource}`; 
							var blogsource = blog.blogsource
							blog.blogsource = <Link to = {blogurl}>{blogsource}</Link>;

							// add link for blogtitle to blog link url
							var blogtitle = blog.title;
							var bloglink = blog.link;
							blog.title = <a href = {bloglink} target = '_blank' rel = "noreferrer">{blogtitle}</a>;

							return '';
						});

						// set the table fields of the aws blog post table
						const fields = [
							{ name: 'timest', visible: false },
							{ name: 'datestr', displayName: "Age", visible: true },
							{ name: 'blogsource', displayName: "Blog", inputFilterable: true, exactFilterable: false, sortable: true },
							{ name: 'title', displayName: "Title", inputFilterable: true, exactFilterable: false, sortable: true },
							{ name: 'link', inputFilterable: false, visible: false }
						];

						// add description field if the page is shown on a device with larger resolution
						if (window.innerWidth > 1000) {
							fields.push({ name: 'description', displayName: "Description", inputFilterable: true, exactFilterable: false })
						};

						return (
							<div>
								<center>
								<br /><br />
								<Link to = "/app/all/">All blogs</Link>{' • '}
								<Link to = "/app/whats-new/">What's New</Link>{' • '}
								<Link to = "/app/compute/">Compute</Link>{' • '}
								<Link to = "/app/developer/">Developer</Link>{' • '}
								<Link to = "/app/mobile/">Mobile</Link>

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
								</center>
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
