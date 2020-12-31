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
	  }
	  nextToken
    }
  }
`;
