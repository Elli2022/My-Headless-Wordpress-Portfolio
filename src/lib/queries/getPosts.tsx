// src/pages/queries/getPosts.tsx
import WP from "../api/wp";

export default async function getPosts(
  page = 1,
  perPage = 6,
  afterCursor = "",
  beforeCursor = "",
  databaseId = "" 
) {
  try {
    let queryArgs = {};

    if (afterCursor) {
      queryArgs = { after: afterCursor, first: perPage };
    } else if (beforeCursor && page > 1) {
      queryArgs = { before: beforeCursor, last: perPage };
    } else {
      queryArgs = { first: perPage };
    }
    
    // Lägg till databaseId i queryArgs om det finns
    if (databaseId) {
      queryArgs = { ...queryArgs, categoryId: parseInt(databaseId, 10) }; // Omvandlar databaseId till en siffra
    }

    console.log("Page:", page);
    console.log("PerPage:", perPage);
    console.log("AfterCursor:", afterCursor);
    console.log("BeforeCursor:", beforeCursor);
    console.log("Query Arguments:", queryArgs);
   

    const resPost = await WP(
      `query GetPosts($after: String, $first: Int, $last: Int, $before: String, $categoryId: Int) {
        posts(after: $after, first: $first, last: $last, before: $before, where: {categoryId: $categoryId}) {
          edges {
            node {
              id
              title
              content
              featuredImage {
                node {
                  mediaItemUrl
                  altText
                }
              }
              slug
              PostInfo {
                subtitle
              }
            }
            cursor
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
        categories {
          nodes {
            id
            databaseId
            name
          }
        }
      }`,
      queryArgs
    );

    if (!resPost?.data) {
      throw new Error("Could not fetch posts");
    }

    return {
      posts: resPost?.data?.posts?.edges?.map((edge: any) => edge.node),
      pageInfo: resPost?.data?.posts?.pageInfo,
      categories: resPost?.data?.categories?.nodes,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
