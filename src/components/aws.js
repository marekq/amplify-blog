import React, { forwardRef } from 'react'
import prettyMilliseconds from 'pretty-ms';
import MaterialTable from 'material-table';
import { Container } from 'react-bulma-components';
import { Link } from 'gatsby';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import AppSyncConfig from "../AppSyncConfig.js";
import { QueryDdbByVisibleAndTimest, QueryDdbByBlogsourceAndTimest, QueryDdbGetDetailText } from './graphql/queries';

// material ui
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ViewColumn from "@material-ui/icons/ListAltRounded";
import Button from '@material-ui/core/Button';
import TablePagination from "@material-ui/core/TablePagination";

// configure appsync with config stored in 'AppSyncConfig.js'
Amplify.configure(AppSyncConfig);

// set table icons
const tableIcons = {
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

// main react class
class App extends React.Component {

	constructor(props) {
		super(props);

		// to be improved - get the uri of the url by stripping /blog from the url
		var bloguri = props.location.pathname.slice(6, -1);

		if (bloguri === '') {
			bloguri = 'all'
		}

		// disable mql during 'yarn build'
		var mql1 = ''
		if (typeof window !== `undefined`) {
			mql1 = window.matchMedia(`(min-width: 800px)`);
		} 

		// set the state of url, path and current open article in detailpanel
		this.state = { 
			path1: String(bloguri), 
			mql1: mql1, 
			loading1: true, 
			description: '', 
			guid: '', 
			author: '', 
			link: '',
			nexttoken: null,
			prevtoken: '',
			totalRow: 25,
			page: 0,
			rowsPerPage: 25,
			tableRef: React.createRef()
		};

	}

	// get specific blog category pages from appsync
	async getGQLPerBlog() {

		var nexttoken = this.state.nexttoken;

		// set timestamp for 90 days ago
		var timest = Math.floor(Date.now() / 1000) - (86400 * 90);

		// return specific blog category 
		await API.graphql(graphqlOperation(QueryDdbByBlogsourceAndTimest,
			{
				'blogsource': this.state.path1,
				'timest': timest,
				'nextToken': nexttoken
			}
	
		)).then(({ data }) => {
			
			// set next token and result
			this.state.data = data.QueryDdbByBlogsourceAndTimest.items;
			this.state.nexttoken = data.QueryDdbByBlogsourceAndTimest.nextToken;
		});

		// update page
		this.forceUpdate();

	}

	// get all blog articles from appsync
	async getGQLAllBlogs(){

		var nexttoken = this.state.nexttoken;

		// set timestamp for 30 days ago
		var timest = Math.floor(Date.now() / 1000) - (86400 * 30);

		// return all blogs if path is 'all'
		await API.graphql(graphqlOperation(QueryDdbByVisibleAndTimest, 
			{
				'timest': timest,
				'nextToken': nexttoken
			}

		)).then(({ data }) => {

			// set next token and result
			this.state.data = data.QueryDdbByVisibleAndTimest.items;
			this.state.nexttoken = data.QueryDdbByVisibleAndTimest.nextToken;

		});

		// update page
		this.forceUpdate();

	}

	// load blog post article details
	async loadBlogArticle(guid){

		let result;

		// set temporary values during load
		this.description = 'Loading...';
		this.author = '';
		this.link = '';

		await API.graphql(graphqlOperation(QueryDdbGetDetailText, 
			{
				'guid': guid
			}

		)).then(({ data }) => {
			result = data.QueryDdbGetDetailText;

			this.description = result.items[0].description;
			this.author = result.items[0].author;
			this.link = result.items[0].link;
			
		});
		
		this.guid = guid;

		return result
	}
	
	// load the blog from graphql
	async componentDidMount(){
		await this.getBlogsData();
	}

	async getBlogsData() {
		if (this.state.path1 === 'all') {
			await this.getGQLAllBlogs();

		} else {
			await this.getGQLPerBlog();
		}

		var data = this.state.data;

		if (this.state.nexttoken != null) {

			// if nexttoken is present, increase totalRow count
			this.state.totalRow = this.state.totalRow + 25;

		} else {
			// if no token found, set total rows to retrieved amount
			this.state.totalRow = data.length;

		}

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
			blog.bloglink = <Link key = {blog.link} to = {`/blog/${blog.blogsource.toString()}/`}>{blog.blogsource.toString().replace("-", " ")}</Link>;
			const btitle = blog.title.toString();
			
			blog.sourcetitle = <div key = {blog.link}><b key = {blog.link}>{blog.bloglink}<br /></b>{btitle}</div>;
			blog.key = blog.blogsource.toString() + blog.timest.toString()

			return ''
		});

		// set data and loading state
		this.setState({
			data: data,
			loading1: false
		})
	}

	// handle page change in table
	handleChangePage = async (page) => {
		
		this.state.page = page
		await this.getBlogsData();
		
	};

	// render the page output
	render() {
		const columns = [];
		const path1 = this.state.path1;
		const materialtitle = path1 + ' blogs'
		const returnlink = [];
		const mql = this.state.mql1;

		// add hidden timest column for article sorting 
		columns.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true, searchable: false });

		// add age column
		columns.push({ title: 'Age', field: 'datestr', width: 0, searchable: true });

		// if fullmode is true, add blog and title column
		if (mql.matches) {

			columns.push({ title: 'Blog', field: 'bloglink', width: 0, searchable: true });
			columns.push({ title: 'Title', field: 'title', width: 1000, searchable: true });

		// if fullmode is false, add shortened title column and no blog source column
		} else {

			columns.push({ title: 'Title', field: 'sourcetitle', width: 1000, searchable: true });

		};
		
		// add the return button on top for specific blog pages
		if (path1 !== "all") {
			returnlink.push(<Link key = "homelink" to = "/"><Button color="primary">view all blogs</Button><br /></Link>)

		} else {
			returnlink.push(<br key = "br" />)
		}

		// async get the blog detailed content
		var getblog = async (guid) => {

			// if guid is not locally set
			if (guid !== this.guid) {

				// get the blog article details
				await this.loadBlogArticle(guid);

				// update page
				this.forceUpdate();


			}
		};

		return (
			<center> 
				<Container>
					{returnlink}
				</Container>

				<MaterialTable
					title = {materialtitle}
					style = {{position: "sticky", padding: "0%" }}
					options = {{
						search: false,
						showFirstLastPageButtons: false,
						emptyRowsWhenPaging: false,
						pageSize: 25,
						pageSizeOptions: [25],
						detailPanelType: "single",
						loadingType: "linear",
						showEmptyDataSourceMessage: false,
						padding: "default",
						draggable: false,
						sorting: true,
						editable: false,
						doubleHorizontalScroll: true
					}}
					components = {{
						OverlayLoading: () => <div />,
						Pagination: (props) => (
						  <TablePagination
							component = "td"
							labelRowsPerPage = ""
							rowsPerPage = {this.state.rowsPerPage}
							count = {this.state.totalRow}
							page = {this.state.page}
							onChangePage = {(e, page) => {this.handleChangePage(page)}}
						  />
						)
					}}
					isLoading = {this.state.loading1}
					data = {this.state.data}
					icons = {tableIcons}
					columns = {columns}
					detailPanel = {[
						{
							tooltip: 'Show blogpost details',
							icon: KeyboardArrowRight,
							openIcon: KeyboardArrowDown,
							render: data => {
								
								// get blog details from appsync
								getblog(data.guid);

								return (
									<div id = "container" key = "container" style = {{
										fontSize: 16,
										margin: 20,
										color: 'black'
									}}>
										<center>
											<i>Posted {data.datestr} ago by {this.author} in {data.bloglink}</i>
											<br /><br />
												{this.description}
											<br /><br />
											<a href = {this.link} target = "_blank" rel = "noreferrer" key = "blogurl"><b>Visit blog here</b></a>
										</center>
									</div>
								)
							},
						}
					]}
				/>
			</center>		
		);
	}
}

export default App;
