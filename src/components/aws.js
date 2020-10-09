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
		this.state = { url1: url + bloguri + '.json', path1: String(bloguri)};

	}

	render() {
		return (
			<div className = "container">
				
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
							
							// add link for blogtitle to blog link url
							var blogtitle = blog.title;
							var bloglink = blog.link;
							blog.title = <a href = {bloglink} target = '_blank' rel = "noreferrer">{blogtitle}</a>;

							// set blogsource
							var blogsource = '';

							// if compact state is set, show the timediff and blogsource in one field
							// this makes it easier to read the table on an iPhone
							if (window.innerWidth < 750 && blog.blogsource === 'all') {
								blogsource = timediff + ' ' + blog.blogsource

							// if full mode is selected, return the blogsource
							} else {
								blogsource = blog.blogsource
							}

							// set a link for the blog source to the blog url
							blog.blogsource = <Link to = {blogurl}>{blogsource.replace("-", " ")}</Link>;

							return '';
						});

						// set the table fields of the aws blog post table and the viewswitch option
						const fields = [];
						
						// get the url value
						console.log(this.state.url1);
						var tmpurl = this.state.url1;

						// if fullmode is true, add description and datestr field if the compact view state is false
						if (window.innerWidth > 750) {
							fields.push({ name: 'timest', visible: false });
							fields.push({ name: 'datestr', displayName: "Age", visible: true });

							if (tmpurl.endsWith("all.json")) {
								fields.push({ name: 'blogsource', displayName: "Blog", inputFilterable: true, exactFilterable: false, sortable: true })
							};

							fields.push({ name: 'title', displayName: "Title", inputFilterable: true, exactFilterable: false, sortable: true});
							fields.push({ name: 'link', inputFilterable: false, visible: false });
							fields.push({ name: 'description', displayName: "Description", inputFilterable: true, exactFilterable: false });
						
						// if fullmode is false, do NOT add description and datestr field if the compact view state is true
						} else {
							fields.push({ name: 'timest', visible: false });

							if (tmpurl.endsWith("all.json")) {
								fields.push({ name: 'blogsource', displayName: "Blog", inputFilterable: true, exactFilterable: false, sortable: true })
							};

							fields.push({ name: 'title', displayName: "Title", inputFilterable: true, exactFilterable: false, sortable: true});
							fields.push({ name: 'link', inputFilterable: false, visible: false });

						}

						return (
							<div>
								<center>

								<br />
									<Link to = "/app/all/">All blogs</Link>{' • '}
									<Link to = "/app/whats-new/">What's New</Link>{' • '}
									<Link to = "/app/compute/">Compute</Link>{' • '}
									<Link to = "/app/developer/">Developer</Link>{' • '}
									<Link to = "/app/mobile/">Mobile</Link>
								<br /><br />

								<h3>{this.state.path1.toUpperCase()} BLOGS</h3>

								<FilterableTable
									namespace="blogs"
									topPagerVisible={true}
									pagersVisible={false}
									headerVisible={false}
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
