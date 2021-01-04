import React, { forwardRef } from 'react'
import prettyMilliseconds from 'pretty-ms';
import MaterialTable from 'material-table';
import { Container } from 'react-bulma-components';
import { Link } from 'gatsby';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import AppSyncConfig from "../AppSyncConfig.js";
import { QueryDdbByVisibleAndTimest, QueryDdbByBlogsourceAndTimest, QueryDdbGetDetailText, QueryDdbItemCountPerBlog, QueryDdbItemCountAll } from './graphql/queries';

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

// set timestamp for 90 days ago
var timest = Math.floor(Date.now() / 1000) - (86400 * 90);

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
			totalRow: 0,
			page: 0,
			rowsPerPage: 25,
			totalpagecount: 0,
			tabletitle: '',
			tableRef: React.createRef(),
			tokens: {
				pages: {
					0: null
				}
			}
		};

		// add keyboard navigation using left/right keys if window available
		if (typeof window !== `undefined`) {

			document.addEventListener('keyup', (e) => {

				// left arror if pagesize larger than 0
				if(e.code === 'ArrowLeft' && this.state.page > 0) {
					this.handleChangePage(this.state.page - 1)
				}

				// right arrow if page smaller than total page count
				if(e.code === 'ArrowRight' && this.state.totalpagecount > this.state.page + 1) {
					this.handleChangePage(this.state.page + 1)
				}
			})
		};
	}

	// get specific blog category pages from appsync
	async getGQLPerBlog() {

		var token = this.state.tokens.pages[this.state.page];

		// return specific blog category 
		await API.graphql(graphqlOperation(QueryDdbByBlogsourceAndTimest,
			{
				'blogsource': this.state.path1,
				'timest': timest,
				'nextToken': token
			}
	
		)).then(({ data }) => {
						
			// set data
			this.state.data = data.QueryDdbByBlogsourceAndTimest.items;

			// create copy of page
			var newPages = { ...this.state.tokens.pages };

			// get resptoken for next page
			var respToken = data.QueryDdbByBlogsourceAndTimest.nextToken;
			newPages[this.state.page + 1] = respToken;

			// set token in state
			const newToken = { ...this.state.tokens, pages : newPages };
			this.setState({ tokens : newToken });

		});

	}

	// get all blog articles from appsync
	async getGQLAllBlogs(){

		var token = this.state.tokens.pages[this.state.page];

		// return all blogs if path is 'all'
		await API.graphql(graphqlOperation(QueryDdbByVisibleAndTimest, 
			{
				'timest': timest,
				'nextToken': token
			}

		)).then(({ data }) => {

			// set data
			this.state.data = data.QueryDdbByVisibleAndTimest.items;

			// create copy of page
			var newPages = { ...this.state.tokens.pages };

			// get resptoken for next page
			var respToken = data.QueryDdbByVisibleAndTimest.nextToken;
			newPages[this.state.page + 1] = respToken;

			// set token in state
			const newToken = { ...this.state.tokens, pages : newPages };
			this.setState({ tokens : newToken });

		});


	}

	// load blog post article details
	async loadBlogArticle(guid){

		let result;

		// reset values before retrieve to reduce page shifting
		this.state.description = '';
		this.state.author = '';
		this.state.link = '';

		await API.graphql(graphqlOperation(QueryDdbGetDetailText, 
			{
				'guid': guid
			}

		)).then(({ data }) => {

			// get result
			result = data.QueryDdbGetDetailText;

			// store response values in state
			this.state.description = result.items[0].description;
			this.state.author = result.items[0].author;
			this.state.link = result.items[0].link;

		});
	}

	// get item count per blog category
	async getItemCount(blogsource){

		if (this.state.totalRow === 0) {

			await API.graphql(graphqlOperation(QueryDdbItemCountPerBlog,
				{
					'blogsource': blogsource
				}

			)).then(({ data }) => {

				// set totalrow state
				this.state.totalRow = data.QueryDdbItemCountPerBlog.items[0].articlecount;
				
				// set total page count value based on a page size of 25
				this.state.totalpagecount = (this.state.totalRow / 25);

			});
		}	
	}

	// load the blog from graphql on initial load
	async componentDidMount(){

		await this.getBlogsData();
	}

	// get blog content and item count
	async getBlogsData(token) {

		if (this.state.path1 === 'all') {

			// get all item count and blog content
			await this.getItemCount('all');
			await this.getGQLAllBlogs();

		} else {

			// get per blog content based on path
			await this.getItemCount(this.state.path1);
			await this.getGQLPerBlog();

		}

		// set data variable
		var data = this.state.data;

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

		// set page table title
		this.state.tabletitle = this.state.path1.toUpperCase() + ' (' + (this.state.page + 1 ) + '/' +  Math.floor(this.state.totalpagecount + 1 ) + ')'

		// set data and loading state
		this.setState({
			data: data,
			loading1: false
		})

		// update page
		this.forceUpdate();
	}

	// handle page change in table
	handleChangePage = async (page) => {
		
		console.log('go from page ', this.state.page + ' --->' + page + ' on ' + this.state.path1);		
		var token = this.state.token;

		// if new page is higher
		if (page > this.state.page) {
			token = this.state.nexttoken;

		// if new page is lower
		} else if (page < this.state.page) {
			token = this.state.prevtoken;

		}

		// set page number
		this.state.page = page;

		// get blog data
		await this.getBlogsData(token);

	};


	// render the page output
	render() {

		// set variables for table and table title
		const columns = [];
		const returnlink = [];

		// add hidden timest column for article sorting 
		columns.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true, searchable: false });

		// add age column
		columns.push({ title: 'Age', field: 'datestr', width: 0, searchable: true });

		// get window status
		const mql = this.state.mql1;

		// if fullmode is true, add blog and title column
		if (mql.matches) {

			columns.push({ title: 'Blog', field: 'bloglink', width: 0, searchable: true });
			columns.push({ title: 'Title', field: 'title', width: 1000, searchable: true });

		// if fullmode is false, add shortened title column and no blog source column
		} else {

			columns.push({ title: 'Title', field: 'sourcetitle', width: 1000, searchable: true });

		};
		
		// add the return button on top for specific blog pages
		if (this.state.path1 !== "all") {
			returnlink.push(<Link key = "homelink" to = "/"><Button color="primary">view all blogs</Button><br /></Link>)

		} else {
			returnlink.push(<br key = "br" />)
		}

		// async get the blog detailed content
		var getblog = async (guid) => {

			// if guid is not locally set
			if (guid !== this.state.guid) {

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
						Toolbar: (props) => (
							<table>
								<tr>
									<td style = {{ verticalAlign: 'middle', maxHeight: "20px", maxWidth: "300px", fontSize: "14", padding: "10px" }} >
										<h2>{this.state.tabletitle}</h2>
									</td>
									<TablePagination
										component = "td"
										rowsPerPageOptions = {[25]}
										rowsPerPage = {this.state.rowsPerPage}
										count = {this.state.totalRow}
										page = {this.state.page}
										onChangePage = {(e, page) => {this.handleChangePage(page)}}
									/>
								</tr>
							</table>
						),
						Pagination: (props) => (
							<center>
								<TablePagination
									component = "td"
									labelRowsPerPage = ""
									rowsPerPageOptions = {[25]}
									rowsPerPage = {this.state.rowsPerPage}
									count = {this.state.totalRow}
									page = {this.state.page}
									onChangePage = {(e, page) => {this.handleChangePage(page)}}
								/>
							</center>
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
											<i>Posted {data.datestr} ago by {this.state.author} in {data.bloglink}</i>
											<br /><br />
												{this.state.description}
											<br /><br />
											<a href = {this.state.link} target = "_blank" rel = "noreferrer" key = "blogurl"><b>Visit blog here</b></a>
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
