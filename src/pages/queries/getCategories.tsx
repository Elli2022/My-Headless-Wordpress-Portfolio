//src/pages/queries/getCategories.tsx
import WP from "../api/wp";

export default async function getCategories() {
  try {
    const res = await WP(`
    query GetCategories($first: Int, $last: Int, $after: String, $before: String, $categoryId: Int) {
        posts(
          first: $first
          last: $last
          after: $after
          before: $before
          where: {categoryId: $categoryId}
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
          edges {
            cursor
            node {
              id
              title
              slug
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
            }
          }
        }
        categories {
          nodes {
            name
            databaseId
          }
        }
      }
    `);

    if (!res?.data) {
      throw new Error("Could not fetch categories");
    }

    return res.data.categories.nodes;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
