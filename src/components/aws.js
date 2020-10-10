import React, { forwardRef } from 'react'
import Async from 'react-async';
import prettyMilliseconds from 'pretty-ms';
import fetch from 'node-fetch';
import { Link } from "gatsby";
import MaterialTable from 'material-table';
import { Clear, FirstPage, LastPage, ChevronRight, ChevronLeft, Search } from "@material-ui/icons";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const url = 'https://feed.marek.rocks/'

let direction = "ltr";

const theme = createMuiTheme({
  direction: direction,
  palette: {
    type: "light",
  },
});

const tableIcons = {
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />)
  };

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
							blog.blogsource = blogsource.toString().replace("-", " ");

							return '';

						});

						// set the table fields of the aws blog post table and the viewswitch option
						const fields = [];
						
						// get the url value
						var tmpurl = this.state.url1;

						// if fullmode is true, add description and datestr field if the compact view state is false
						if (window.innerWidth > 750) {
							fields.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true, searchable: false});
							fields.push({ title: 'Age', field: 'datestr', width: 20, searchable: true });

							// add the blogsource if the 'all' category is selected
							if (tmpurl.endsWith("all.json")) {
								fields.push({ title: 'Blog', field: 'blogsource', width: 50, searchable: true })
							};

							fields.push({ title: 'Title', field: 'title', minwidth: 500, searchable: true });

						// if fullmode is false, do NOT add description and datestr field if the compact view state is true
						} else {
							fields.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true, searchable: false});

							if (tmpurl.endsWith("all.json")) {
								fields.push({ title: 'Blog', field: 'blogsource', width: 50, searchable: true })
							};

							fields.push({ title: 'Title', field: 'title', minwidth: 500, searchable: true });

						}

						// add the description as non visible to allow search 
						fields.push({ title: 'Description', field: 'description', hidden: true, searchable: true});

						return (
							<MuiThemeProvider theme={theme}>
								<center>

								<br />
									<Link to = "/app/all/">All blogs</Link>{' • '}
									<Link to = "/app/whats-new/">What's New</Link>{' • '}
									<Link to = "/app/compute/">Compute</Link>{' • '}
									<Link to = "/app/developer/">Developer</Link>{' • '}
									<Link to = "/app/mobile/">Mobile</Link>
								<br /><br />

								<MaterialTable
								    title = {this.state.path1.toUpperCase()}
									options={{
										search: true,
										sorting: true,
										columnResizable: true,
										pageSize: 100
									}}
									tableLayout="fixed"
									filtering={true}
									data={data}
									icons={tableIcons}
									columns={fields}
									detailPanel={[
										{
										  tooltip: 'Show Description',
										  render: data => {
											return (
												<div class = "container">
													<i>Posted {data.datestr} ago by {data.author} in {data.blogsource}</i><br /><br />
													{data.description}
											  	</div>
											)
										  },
										}
									]}
								/>
							</center>
						</ MuiThemeProvider>
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
