import React, { forwardRef } from 'react'
import prettyMilliseconds from 'pretty-ms';
import MaterialTable from "material-table";
import Link from "gatsby-link";
import parse from 'html-react-parser';

// amplify and appsync
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import AppSyncConfig from "../AppSyncConfig.js";
import { QueryDdbByVisibleAndTimest, QueryDdbByBlogsourceAndTimest, QueryDdbGetDetailText, QueryDdbItemCountPerBlog } from './graphql/queries';
//import { QueryDdbItemCountAll } from './graphql/queries';

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
import * as styles from "../components/css/table.css";

// algolia
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import 'instantsearch.css/themes/algolia.css';

const searchClient = algoliasearch('FDHHMAIGTE', '6c590e02d2e56fbaec33ee4e8b8638a9', { _useRequestCache: true });
const index = searchClient.initIndex('rssaws');

// search proxy to prevent query to Algolia on initial page load
const searchProxy = {
	search(requests) {

		const query = requests[0]['params']['query'];

		if (query.length !== 0) {
			return searchClient.search(requests);
		}

		return Promise.resolve({
			results: [{ hits: [] }],
		});
	},
	searchForFacetValues: searchClient.searchForFacetValues,
};

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

// set timestamp for 365 days ago
var timest = Math.floor(Date.now() / 1000) - (86400 * 365);

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

		// set the state of url, path and current open article props for detailpanel
		this.state = { 
			author: '', 
			description: '', 
			detailrawdescription: '',
			detailrawhtml: '',
			detailrenderout: '',
			detailrendermode: '',
			guid: 'empty', 
			link: '',
			loading1: true, 
			mql1: mql1, 
			page: 0,
			path1: String(bloguri), 
			pending: true,
			rowsPerPage: 25,
			searchquery: '',
			selectedRow: -1,
			tableRef: React.createRef(),
			tabledense: '',
			tabletitle: '',
			toolbartitle: 'all blogs',
			totalRow: 0,
			totalpagecount: 0,
			tokens: {
				pages: {
					0: null
				}
			}
		};

		// set material table density depending on screen width
		if (mql1.matches) {

			// set to default mode and full text mode if in fullscreen browser
			this.state.tabledense = "default";

		} else {

			// set to dense mode and compact description text if mobile
			this.state.tabledense = "dense";

		};

		// set mode to "compact" if no mode was set
		if (this.state.detailrendermode === '') {

			this.state.detailrendermode = "compact";
		}

		// add keyboard navigation using left/right keys if window available
		if (typeof window !== `undefined`) {

			document.addEventListener('keyup', (e) => {

				// on left arrow press, go to next page
				if(e.code === 'ArrowLeft' && this.state.page > 0) {
					this.handleChangePage(this.state.page - 1)
				};

				// on right arrow press, go to previous page
				if(e.code === 'ArrowRight' && this.state.totalpagecount > this.state.page + 1) {
					this.handleChangePage(this.state.page + 1)
				};

			});
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

		// get blogpost details per guid
		if (guid !== 'empty') {

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

				// store brief summary or full html depending on detail render mode
				if (this.state.detailrendermode === 'full') {

					this.state.detailrenderout = result.items[0].rawhtml;

				} else if (this.state.detailrendermode === 'compact') {

					this.state.detailrenderout = result.items[0].description;

				}

				// store rawhtml and description for caching purposes
				this.state.detailrawhtml = result.items[0].rawhtml;
				this.state.detailrawdescription = result.items[0].description;

				// update page only once 
				if (this.state.guid !== guid) {

					// set guid to current one
					this.state.guid = guid;

					// update page
					this.forceUpdate();

				}
			});
		};
	}

	// get item count per blog category
	async getItemCount(blogsource){

		if (this.state.totalRow === 0) {

			// get blog posts based on blog source
			await API.graphql(graphqlOperation(QueryDdbItemCountPerBlog,
				{
					'blogsource': blogsource
				}

			)).then(({ data }) => {

				// set totalrow state
				this.state.totalRow = data.QueryDdbItemCountPerBlog.items[0].articlecount;
				
				// set total page count value based on a page size of 25
				this.state.totalpagecount = Math.floor(this.state.totalRow / 25);

			});
		}	
	}

	// load the blog from graphql on initial load
	async componentDidMount(){

		await this.getBlogsData();
		await this.prepareData();

	}

	// get blog content and item count
	async getBlogsData() {

		if (this.state.path1 === 'all') {

			// get all item count and blog content
			await this.getItemCount('all');
			await this.getGQLAllBlogs();

		} else {

			// get per blog content based on path
			await this.getItemCount(this.state.path1);
			await this.getGQLPerBlog();

		}

		this.state.toolbartitle = this.state.path1 + " blogs";

	};

	async prepareData() {
		// set data variable
		var data = this.state.data;

		// get the current timestamp
		var now = new Date().getTime();

		// convert the unix timestamp of every blog to a timediff string
		data.map(function(blog){
							
			// get the time difference in seconds
			var timestamp = now - (blog.timest * 1000);

			// get the time difference string and set it in data
			var timediff = prettyMilliseconds(timestamp, {compact: true});
			blog.datestr = timediff;
			
			var btitle = '';

			// if search text is returned with _highlightResult
			if ('_highlightResult' in blog) {

				btitle = blog['_highlightResult']['title']['value'];

			} else {

				btitle =  blog.title;

			}

			// parse html string for title
			blog.title = parse(btitle);			
			blog.bloglink = <Link key = {blog.link} to = {`/blog/${blog.blogsource.toString()}/`}>{blog.blogsource.toString().replace("-", " ")}</Link>;			
			
			blog.sourcetitle = <div key = {blog.link}><b key = {blog.link}>{blog.bloglink}<br /></b>{blog.title}</div>;
			blog.key = blog.blogsource.toString() + blog.timest.toString()

			// return null
			return null

		});

		// set data, table title and loading state
		this.setState({
			data: data,
			loading1: false,
			tabletitle: this.state.path1.toUpperCase() + ' (' + (this.state.page + 1 ) + '/' +  this.state.totalpagecount + ')'
		});
	};

	// handle page change in table
	handleChangePage = async (page) => {
		
		console.log('go from page ', this.state.page + ' ---> ' + page + ' on ' + this.state.path1);		
		var token = this.state.token;

		// if new page is higher
		if (page > this.state.page) {
			token = this.state.nexttoken;

		// if new page is lower
		} else if (page < this.state.page) {
			token = this.state.prevtoken;

		}

		// set page number, reset selected row to -1
		this.state.selectedRow = -1;
		this.state.page = page;

		// get blog data and update page
		await this.getBlogsData(token);
		await this.prepareData();

	};

	// handle scroll to top button click if not during build
	handleTop = async (e) => {

		if (typeof window !== `undefined`) {
			window.scrollTo(0, 0);
		}
	};

	// handle toolbar button click to switch between full and compact mode for detailpanel
	handleClick = async (e) => {

		// get newmode
		var newmode = e[0];
		var guid = e[1];

		// load article if new guid
		if (guid !== this.state.guid) {
			
			await this.loadBlogArticle(guid);

		};

		// if submitted mode is different from stored mode
		if (this.state.detailrendermode !== newmode) {
			
			if (newmode === 'full') {
			
				// set state to full mode
				this.setState({ 
					detailrendermode: newmode,
					detailrenderout: this.state.detailrawhtml
				});	
			
			} else if (newmode === 'compact') {

				// set state to compact mode
				this.setState({ 
					detailrendermode: newmode,
					detailrenderout: this.state.detailrawdescription
				});	
			}
		};
	};

	// search page using Algolia
	searchPage = async (e) => {

		var keyword = this.state.searchquery;
		e.preventDefault();

		// if keyword received, search
		if (keyword.length !== 0) {

			await index.search(keyword, {
				'attributesToRetrieve': [
					'blogsource',
					'guid',
					'timest',
					'title',
					'timest'
				],
				'attributesToHighlight': [
					'*'
				],
				'highlightPreTag': '<font style = "color: red">',
				'highlightPostTag': '</font>',
				'hitsPerPage': 100

			}).then(({ hits }) => {

				this.setState({
					data: hits,
					totalRow: hits.length,
					totalpagecount: Math.floor(hits.length / 25),
					page: 0,
					toolbartitle: "search results : " + keyword
				});
			});
		};

		await this.prepareData();

	}

	// update the query in state when the user types
	updateQuery = async (e) => {

		e.preventDefault();
		var x = e.target.value;
		this.state.searchquery = x;
		console.log('search', this.state.searchquery);
	}

	// update the query in state when the user types
	resetSearch = async (e) => {

		e.preventDefault();
		this.state.searchquery = '';
		this.state.toolbartitle = this.state.path1 + " blogs";

		await this.getBlogsData();
		await this.prepareData();

	}

	// render the page output
	render() {

		// set variables for table and table title
		const columns = [];
		const returnlink = [];

		// add hidden timest column for article sorting 
		columns.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true });

		// add age column
		columns.push({ title: 'Age', field: 'datestr', width: 0 });

		// get window status
		const mql = this.state.mql1;

		// if fullmode is true, add blog and title column
		if (mql.matches) {

			columns.push({ title: 'Blog', field: 'bloglink', width: 0 });
			columns.push({ title: 'Title', field: 'title', width: 1000 });

		// if fullmode is false, add shortened title column and no blog source column
		} else {

			columns.push({ title: 'Title', field: 'sourcetitle', width: 1000 });

		};
		
		// add the return button on top
		returnlink.push(
			<InstantSearch
				indexName = "rssaws"
				searchClient = {searchProxy}
				key = "instantsearch"
			>
				<SearchBox 
					searchAsYouType = {false}
					translations = {{
						placeholder: 'Search AWS blogs...',
					}}
					onReset = {this.resetSearch}
					defaultRefinement = {this.state.searchquery}
					searchClient = {searchProxy}
					onChange = {this.updateQuery}
					onSubmit = {this.searchPage}
					key = "searchbox"
				/>
			</InstantSearch>
		)
		

		// async get the blog detailed content
		var loadarticle = async (guid) => {

			// if guid is not locally set
			if (guid !== this.state.guid) {
				
				// get the blog article details
				await this.loadBlogArticle(guid);
			}
		};

		// create pagination component shown on top and bottom of page
		const PageComponent = 
			<center>
				<TablePagination
					style = {{alignSelf: 'center'}}
					component = "div"
					rowsPerPageOptions = {[25]}
					rowsPerPage = {this.state.rowsPerPage}
					count = {this.state.totalRow}
					page = {this.state.page}
					onChangePage = {(e, page) => {this.handleChangePage(page)}}
					labelDisplayedRows = {({ from, to, count }) => `${this.state.toolbartitle} - ${from}-${to} from ${count}${this.state.totalpagecount < 1 ? '' : ` -  page ${this.state.page + 1}/${this.state.totalpagecount + 1}`}`}
				/>	
			</center>

		return (
			<center> 
				<div>
					{returnlink}
				</div>

				<MaterialTable
					style = {{ padding: "0" }}
					tableRef = {this.state.tableRef}
					isLoading = {this.state.loading1}
					data = {this.state.data}
					icons = {tableIcons}
					columns = {columns}

					options = {{
						search: false,
						grouping: false,
						showFirstLastPageButtons: false,
						emptyRowsWhenPaging: false,
						pageSize: 25,
						pageSizeOptions: [25],
						detailPanelType: "single",
						loadingType: "overlay",
						showEmptyDataSourceMessage: true,
						padding: this.state.tabledense,
						draggable: false,
						sorting: false,
						editable: false,
						doubleHorizontalScroll: true,
						rowStyle: rowData => ({backgroundColor: (this.state.selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'})
					}}

					// change background on row click or detailpanel expand
					onRowClick = {((evt, selectedRow, togglePanel) => { 

						// set selected row and toggle detail panel 
						this.setState({ selectedRow: selectedRow.tableData.id });
						togglePanel();

					})}

					// override components for overlay and top toolbars and pagination
					components = {{
						OverlayLoading: () => <div />,
						Toolbar: (props) => (
							<div className = "float-container">
								{PageComponent}
							</div>
						),
						Pagination: (props) => (
							<td align = "center" width = "50%">
								{PageComponent}
								<br />
								<img src = {'/algolia.svg'} alt = "algolia search" />
								<br />
							</td>
						)
					}}
		
					// render detailpanel
					detailPanel = {[
						{
							disabled: true,
							icon: KeyboardArrowRight,
							openIcon: KeyboardArrowDown,
							render: data => {

								// get blog details from appsync
								loadarticle(data.guid);

								// create menu to select full or compact view
								const toolbarMenu = 
								<b>
									<Button size = "small" variant = "text" onClick = {async () => await this.handleClick(['full', data.guid])} style = {{color: (this.state.detailrendermode === 'full') ? 'black' : 'gray'}}>full{' '}</Button>
									<Button size = "small" variant = "text" onClick = {async () => await this.handleClick(['compact', data.guid])} style = {{color: (this.state.detailrendermode === 'compact') ? 'black' : 'gray'}}>compact</Button>
								</b>

								return (
									<div style = {styles}>
										<center>
											<br />
												<i>Posted by {this.state.author}</i>{' '}{this.state.mql1.matches && toolbarMenu}
												<div style = {{ margin: '1em', fontSize: '16px' }}>
													{parse(this.state.detailrenderout)}
												</div>
												<a href = {this.state.link} target = "_blank" rel = "noreferrer" key = "blogurl"><b>Visit blog here</b></a>
											<br /><br />
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
