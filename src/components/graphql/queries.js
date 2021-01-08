export const QueryDdbByVisibleAndTimest = /* GraphQL */ `
  query QueryDdbByVisibleAndTimest(
    $nextToken: String,
	  $timest: Int!
  ) 
  {
    QueryDdbByVisibleAndTimest(timest: $timest, visible: "y", nextToken: $nextToken) {
      items {
        timest
		blogsource
		title
		guid
      }
      nextToken
    }
  }
`;

export const QueryDdbByBlogsourceAndTimest = /* GraphQL */ `
  query QueryDdbByBlogsourceAndTimest(
    $nextToken: String,
    $blogsource: String!,
    $timest: Int!
  ) 
  {
    QueryDdbByBlogsourceAndTimest(blogsource: $blogsource, timest: $timest, nextToken: $nextToken) {
	  items {
	    timest
	    blogsource
	    title
		guid
	  }
	  nextToken
    }
  }
`;

export const QueryDdbGetDetailText = /* GraphQL */ `
  query QueryDdbGetDetailText(
	  $guid: String!
  ) 
  {
    QueryDdbGetDetailText(guid: $guid) {
      items {
        description
        blogsource
        link
        author
        rawhtml
	    }
    }
  }
`;

export const QueryDdbItemCountPerBlog = /* GraphQL */ `
  query QueryDdbItemCountPerBlog(
    $blogsource: String!
  ) 
  {
    QueryDdbItemCountPerBlog(blogsource: $blogsource) {
      items {
        articlecount
        blogsource
        timest
      }
    }
  }
`;

export const QueryDdbItemCountAll = /* GraphQL */ `
  query QueryDdbItemCountAll(
    $timest: String
  ) 
  {
    QueryDdbItemCountAll() {
      items {
        articlecount
        blogsource
        timest
      }
    }
  }
`;
