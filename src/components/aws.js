import React, { forwardRef } from 'react'
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

	// load the blog from s3
	async componentDidMount(){
		var res = await fetch(this.state.url1)
		var data = await res.json()
		
		// get the current timestamp
		var now = new Date().getTime();

		// convert the unix timestamp of every blog to a timediff string
		data.map(function(blog, index){
							
			// get the time difference in seconds
			var timestamp = now - (blog.timest * 1000);

			// get the time difference string and set it in data
			var timediff = prettyMilliseconds(timestamp, {compact: true});
			blog.datestr = timediff;
			
			// strip dashes from blog source and add link
			blog.bloglink = <Link to = {`/app/${blog.blogsource}`}>{blog.blogsource.toString().replace("-", " ")}</Link>;
			const bsource = blog.blogsource.toString().replace('-', ' ');
			const btitle = blog.title.toString();
			blog.sourcetitle = <p><b>{bsource}</b><br />{btitle}</p>;
				
			return ''
		});

		this.setState({
			data: data
		})
	  }

	mediaQueryChanged() {
		this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
	}

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: true });
	}

	render() {
		const fields = [];
		const tmpurl = this.state.url1;
		const returnlink = [];

		// if fullmode is true
		if (mql.matches) {

			fields.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true, searchable: false });
			fields.push({ title: 'Age', field: 'datestr', width: 10, searchable: true });
			fields.push({ title: 'Blog', field: 'bloglink', width: 10, searchable: false });
			fields.push({ title: 'Title', field: 'title', searchable: true });

		// if fullmode is false
		} else {

			fields.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true, searchable: false });
			fields.push({ title: 'Age', field: 'datestr', width: 10, searchable: true });
			fields.push({ title: 'Title', field: 'sourcetitle', minwidth:1000, searchable: true });

		}
		
		// add the blogsource if the 'all' category is selected
		if (!tmpurl.endsWith("all.json")) {
			returnlink.push(<center><Link to = "/app/all/">Go to all blogs</Link><br /><br /></center>)
		}

		// create sidebar menu
		const sidebar = [];
		sidebar.push(<p key = "close"><br /><Link key = "menuClose" onClick = {() => {this.setState({ sidebarOpen: false })}} to = '.'><i><b>close menu</b></i></Link></p>);

		// create a list of blog categories for the menu
		const blogpaths = ['all', 'cloudguru', 'compute', 'corey', 'containers', 'database', 'devops', 'jeremy', 'ml', 'mobile', 'newsblog', 'open-source', 'security', 'serverless', 'whats-new', 'yan'];

		for (const [index, value] of blogpaths.entries()) {

			sidebar.push(<p key = {value}><Link to = {`/app/${value}`} size = "sm" variant = "secondary" key = {index}><i>{value}</i></Link></p>)
		}

		return (
			<div className = "container">
				
				<Sidebar
					sidebar = {sidebar}
					open = {this.state.sidebarOpen}
					onSetOpen = {this.onSetSidebarOpen}
					onSetSidebarOpen = {this.onSetSidebarOpen}
					styles = {{ sidebar: { background: "white", textAlign: "left", padding: "10px", width: "150px"}}}
					transitions = {true}
					shadow = {false}
				>
				<View title = "">  
					<Header />
					<br />								
					<center>
						<h3>{this.state.path1.replace('-', ' ')} blogs</h3><br />
						{returnlink}
					</center>

					<MaterialTable
						title = {<Link to = "." onClick={() => this.onSetSidebarOpen(true) }><Menu /><br /></Link>}
						style = {{position: "sticky", padding: "0%" }}
						isLoading = {false}
						options = {{
							search: true,
							sorting: true,
							pageSize: 50,
							pageSizeOptions: [50, 100, 1000]
						}}
						filtering = {true}
						data = {this.state.data}
						icons = {tableIcons}
						columns = {fields}
						detailPanel = {[
							{
								tooltip: 'Show blogpost details',
								icon: KeyboardArrowRight,
								openIcon: KeyboardArrowDown,
								render: data => {
									return (
										<div id = "container" style = {{
											fontSize: 16,
											margin: 20,
											fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Arial",
											color: 'black'
										}}>
											<center>
												<i>Posted {data.datestr} ago by {data.author} in {data.bloglink}</i>
												<br /><br />
													{data.description}
												<br /><br />
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
						
			</div>
		);
	}
}

export default App;
