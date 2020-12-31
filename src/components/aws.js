import React, { forwardRef } from 'react'
import prettyMilliseconds from 'pretty-ms';
import MaterialTable from 'material-table';
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ViewColumn from "@material-ui/icons/ListAltRounded";
import { Container } from 'react-bulma-components';
import Button from '@material-ui/core/Button';
import { Link } from "gatsby";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { QueryDdbByVisibleAndTimest, QueryDdbByBlogsourceAndTimest } from './graphql/queries';

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

const AppConfig = {
    'aws_appsync_graphqlEndpoint': 'https://ux25dr2sk5aypkzbvsgysa2ev4.appsync-api.eu-west-1.amazonaws.com/graphql',
    'aws_appsync_region': 'eu-west-1',
    'aws_appsync_authenticationType': 'API_KEY',
    'aws_appsync_apiKey': 'da2-62no3ev3jnd6ngf46yxk7co6sm'
}

Amplify.configure(AppConfig);

// main react class
class App extends React.Component {

	constructor(props) {
		super(props);

		// to be improved - get the uri of the url by stripping /blog from the url
		var bloguri = props.location.pathname.slice(6, -1);

		if (bloguri === '') {
			bloguri = 'all'
		}

		// disable mql during server build
		var mql1 = ''
		if (typeof window !== `undefined`) {
			mql1 = window.matchMedia(`(min-width: 800px)`);
		} 

		// set the state of url and path
		this.state = { path1: String(bloguri), mql1: mql1, loading1: true };

	}

	async getGQLPerBlog(){

		let res;

		// set timestamp for 90 days ago
		var timest = Math.floor(Date.now() / 1000) - (86400 * 90);
		console.log('timest perblog ', timest);

		// return specific blog category 
		await API.graphql(graphqlOperation(QueryDdbByBlogsourceAndTimest,
			{
				'blogsource': this.state.path1,
				'timest': timest
			}
	
		)).then(({ data }) => {
			res = data.QueryDdbByBlogsourceAndTimest.items;

		});

		return res.reverse()

	}

	async getGQLAllBlogs(){

		let res;

		// set timestamp for 5 days ago
		var timest = Math.floor(Date.now() / 1000) - (86400 * 5);
		console.log('timest allblogs ', timest);

		// return all blogs if path is 'all'
		await API.graphql(graphqlOperation(QueryDdbByVisibleAndTimest, 
			{
				'timest': timest
			}

		)).then(({ data }) => {
			res = data.QueryDdbByVisibleAndTimest.items;

		});

		return res.reverse()
	}

	// load the blog from graphql
	async componentDidMount(){

		let data;

		if (this.state.path1 === 'all') {

			data = await this.getGQLAllBlogs();

		} else {
			data = await this.getGQLPerBlog();

		}

		console.log(data);

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

		this.setState({
			data: data,
			loading1: false
		})
	}

	render() {
		const columns = [];
		const path1 = this.state.path1;
		const materialtitle = path1 + ' blogs'
		const returnlink = [];
		const mql = this.state.mql1;

		// add timest and age columns
		columns.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true, searchable: false });
		columns.push({ title: 'Age', field: 'datestr', width: 0, searchable: true });

		// if fullmode is true, add blog and title column
		if (mql.matches) {

			if (path1 === "all") {
				columns.push({ title: 'Blog', field: 'bloglink', width: 0, searchable: true });

			}

			columns.push({ title: 'Title', field: 'title', width: 1000, searchable: true });

		// if fullmode is false, add shortened title column and no blog source column
		} else {

			// show source and title for all category
			if (path1 === "all") {
				columns.push({ title: 'Title', field: 'sourcetitle', width: 1000, searchable: true });

			} else {
				columns.push({ title: 'Title', field: 'title', width: 1000, searchable: true });

			}
		};
		
		// add hidden decsription column for search function
		columns.push({ title: 'Description', field: 'description', searchable: true, hidden: true });

		// add the return button on top
		if (path1 !== "all") {
			returnlink.push(<Link key = "homelink" to = "/"><Button color="primary">view all blogs</Button><br /></Link>)

		} else {
			returnlink.push(<br key = "br" />)
		}

		return (
			<center> 
				<Container>
					{returnlink}
				</Container>

				<MaterialTable
					title = {materialtitle}
					style = {{position: "sticky", padding: "0%" }}
					options = {{
						search: true,
						emptyRowsWhenPaging: true,
						pageSize: 25,
						pageSizeOptions: [10, 25, 50, 100],
						detailPanelType: "single",
						loadingType: "linear",
						showEmptyDataSourceMessage: false,
						padding: "default",
						draggable: false,
						sorting: false,
						editable: false,
						doubleHorizontalScroll: true
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
								return (
									<div id = "container" key = "container" style = {{
										fontSize: 16,
										margin: 20,
										color: 'black'
									}}>
										<center>
											<i>Posted {data.datestr} ago by {data.author} in {data.bloglink}</i>
											<br /><br />
												{data.description}
											<br /><br />
											<a href = {data.link} target = "_blank" rel = "noreferrer" key = "blogurl"><b>Visit blog here</b></a>
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
