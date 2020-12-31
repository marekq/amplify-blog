export const QueryDdbByVisibleAndTimest = /* GraphQL */ `
  query QueryDdbByVisibleAndTimest(
    $nextToken: String
  ) 
  {
    QueryDdbByVisibleAndTimest(timest: 123, visible: "y", nextToken: $nextToken) {
      items {
        timest
		blogsource
		title
      }
      nextToken
    }
  }
`;

export const QueryDdbByBlogsourceAndTimest = /* GraphQL */ `
  query QueryDdbByBlogsourceAndTimest(
    $nextToken: String,
	$blogsource: String!
  ) 
  {
    QueryDdbByBlogsourceAndTimest(timest: 123, blogsource: $blogsource, nextToken: $nextToken) {
	  items {
	    timest
	    blogsource
	    title
	  }
	  nextToken
    }
  }
`;
