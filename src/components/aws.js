import React, { forwardRef } from 'react'
import Async from 'react-async';
import prettyMilliseconds from 'pretty-ms';
import fetch from 'node-fetch';
import { Link } from "gatsby";
import MaterialTable from 'material-table';
import { Clear, FirstPage, LastPage, ChevronRight, ChevronLeft, Search, Menu, KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";
import Sidebar from "react-sidebar";
import Header from "../components/header"
import View from "./view.js"

// set the blogfeed
const url = 'https://feed.marek.rocks/'

// disable mql during server build
var mql = ''
if (typeof window !== `undefined`) {
	mql = window.matchMedia(`(min-width: 800px)`);
} 

// set table icons
const tableIcons = {
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />)
  };

// load the blog from s3
const loadBlogs = ({ blogUrl }) =>
  fetch(blogUrl)
	.then(res => (res.ok ? res : Promise.reject(res)))
	.then(res => res.json())

// main react class
class App extends React.Component {

	constructor(props) {
		super(props);

		// to be improved - get the uri of the url by stripping /app from the url
		var bloguri = props.path.slice(5, 999);

		// set the state of url, path and sidebar status
		this.state = { url1: url + bloguri + '.json', path1: String(bloguri), sidebarOpen: false, sidebarDocked: mql.matches };
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
		this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged);
	}

	mediaQueryChanged() {
		this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
	}

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: true });
	}

	render() {
		return (
			<div className = "container">
				
				<Async promiseFn = {loadBlogs} blogUrl = {this.state.url1}>
				<Async.Loading>Loading page... </Async.Loading>
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

							// get the long pretty date string for detailpane
							var longdatestr = prettyMilliseconds(timestamp);
							blog.longdatestr = longdatestr;
							
							// strip dashes from blog source
							blog.blogsource = blog.blogsource.toString().replace("-", " ")

							if (!mql) {
								blog.title = blog.datestr.toString() + ' - ' + blog.title.toString();
							}

							return '';

						});

						// set the table fields of the aws blog post table and the viewswitch option
						const fields = [];
						
						// get the url value
						var tmpurl = this.state.url1;

						// if fullmode is true, add description and datestr field if the compact view state is false
						if (mql) {
							fields.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true, searchable: false});
							fields.push({ title: 'Age', field: 'datestr', width: 20, searchable: true });

							// add the blogsource if the 'all' category is selected
							if (tmpurl.endsWith("all.json")) {
								fields.push({ title: 'Blog', field: 'blogsource', width: 20, searchable: true })
							};

							fields.push({ title: 'Title', field: 'title', minwidth: 1000, searchable: true });

						// if fullmode is false, do NOT add description and datestr field if the compact view state is true
						} else {
							fields.push({ title: 'Timest', field: 'timest', width: 10, defaultSort: 'desc', hidden: true, searchable: false});
			
							if (tmpurl === "all") {
								fields.push({ title: 'Blog', field: 'blogsource', width: 10, searchable: true })

							} else {
								fields.push({ title: 'Age', field: 'datestr', width: 10, searchable: true});
							}

							fields.push({ title: 'Title', field: 'title', searchable: true });

						}

						// add the description as non visible to allow search 
						fields.push({ title: 'Description', field: 'description', hidden: true, searchable: true});

						// create sidebar menu
						const sidebar = [];
						sidebar.push(<p key = "close"><br /><Link key = "menuClose" onClick = {() => {this.setState({ sidebarOpen: false })}} to = '.'><i><b>close menu</b></i></Link></p>);

						// create a list of blog categories for the menu
						const blogpaths = ['all', 'cloudguru', 'compute', 'corey', 'containers', 'database', 'devops', 'jeremy', 'ml', 'mobile', 'newsblog', 'open-source', 'security', 'serverless', 'whats-new', 'yan'];

						for (const [index, value] of blogpaths.entries()) {

							sidebar.push(<p key = {value}><Link to = {`/app/${value}`} size = "sm" variant = "secondary" key = {index}><i>{value}</i></Link></p>)
						}

						return (

							<Sidebar
								sidebar={sidebar}
								open={this.state.sidebarOpen}
								onSetOpen={this.onSetSidebarOpen}
								onSetSidebarOpen={this.onSetSidebarOpen}
								styles={{ sidebar: { background: "white", textAlign: "left", padding: "20px"}}}
								transitions={true}
								shadow={false}
							>
							<View title = "">  
								<Header />
								<br />								
								<center>
									<h1>{this.state.path1.replace('-', ' ')} blogs</h1><br />
								</center>

								<MaterialTable
									title = {<Link to = "." onClick={() => this.onSetSidebarOpen(true) }><Menu /><br /></Link>}
									style={{position: "sticky", padding: "0px" }}
									options={{
											search: true,
											sorting: true,
											pageSize: 50,
											pageSizeOptions: [50, 100, 1000]
										}}
										filtering={true}
										data={data}
										icons={tableIcons}
										columns={fields}
										detailPanel={[
											{
												tooltip: 'Show blogpost details',
												icon: KeyboardArrowRight,
												openIcon: KeyboardArrowDown,
												render: data => {
													return (
														<div id = "container" style={{
															fontSize: 16,
															margin: 20,
															fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Arial",
															color: 'black'
														}}>
															<center>
																<u>Posted {data.longdatestr} ago by {data.author} in {data.blogsource}</u>
																<br /><br />
																{data.description}<br /><br />
																<a href = {data.link} target = "_blank" rel = "noreferrer"><b>Visit blog here</b></a>
															</center>
														</div>
													)
												},
											}
										]}
									/>
								</View>
							</Sidebar>
						)}}
					</Async.Fulfilled>
					<Async.Rejected>
						Something went wrong, <Link to ="/">go back</Link>
					</Async.Rejected>
				</Async>
			</div>
		);
	}
}

export default App;
