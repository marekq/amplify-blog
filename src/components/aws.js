import React, { forwardRef } from 'react'
import prettyMilliseconds from 'pretty-ms';
import fetch from 'node-fetch';
import { Link } from "gatsby";
import MaterialTable from 'material-table';
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { Container } from 'react-bulma-components'
import Button from '@material-ui/core/Button';

// set the blogfeed
const url = 'https://feed.marek.rocks/'

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

		// disable mql during server build
		var mql1 = ''
		if (typeof window !== `undefined`) {
			mql1 = window.matchMedia(`(min-width: 800px)`);
		} 

		// set the state of url and path
		this.state = { url1: url + bloguri + '.json', path1: String(bloguri), mql1: mql1};
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
			blog.bloglink = <Link key = {blog.link} to = {`/app/${blog.blogsource.toString()}`}>{blog.blogsource.toString().replace("-", " ")}</Link>;
			const btitle = blog.title.toString();
			
			blog.sourcetitle = <div key = {blog.link}><b key = {blog.link}>{blog.bloglink}<br /></b>{btitle}</div>;
			blog.key = blog.blogsource.toString() + blog.timest.toString()

			return ''
		});

		this.setState({
			data: data
		})
	  }

	render() {
		const columns = [];
		const tmpurl = this.state.url1;
		const path1 = this.state.path1;
		const materialtitle = path1 + ' blogs'
		const returnlink = [];
		const mql = this.state.mql1;

		// if fullmode is true
		if (mql.matches) {

			columns.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true, searchable: false });
			columns.push({ title: 'Age', field: 'datestr', width: 0, searchable: true });
			columns.push({ title: 'Blog', field: 'bloglink', width: 0, searchable: true });
			columns.push({ title: 'Title', field: 'title', width: 1000, searchable: true });
			columns.push({ title: 'Description', field: 'description', searchable: true, hidden: true });

		// if fullmode is false
		} else {

			columns.push({ title: 'Timest', field: 'timest', defaultSort: 'desc', hidden: true, searchable: false });
			columns.push({ title: 'Age', field: 'datestr', width: 0, searchable: true });
			columns.push({ title: 'Title', field: 'sourcetitle', width: 1000, searchable: true });
			columns.push({ title: 'Description', field: 'description', searchable: true, hidden: true });
		};
		
		// add the blogsource if the 'all' category is selected
		if (!tmpurl.endsWith("all.json")) {
			returnlink.push(<div key = "div"><Link key = "returnlink" to = "/app/all/"><Button color="primary">view all blogs</Button></Link><br /></div>)
		
		} else {
			returnlink.push(<br key = "br" />)
		}

		return (
			<div>  
				<Container>
					{returnlink}
				</Container>

				<MaterialTable
					title = {materialtitle}
					style = {{position: "sticky", padding: "0%" }}
					isLoading = {false}
					options = {{
						search: true,
						sorting: true,
						pageSize: 25,
						pageSizeOptions: [10, 25, 50, 100, 1000]
					}}
					filtering = {true}
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
			</div>		
		);
	}
}

export default App;
