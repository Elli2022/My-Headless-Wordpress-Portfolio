// // getPostsByCategory.tsx
// import WP from "../api/wp";


// export default async function getPostsByCategory(categoryId: any, first = 10, after = "") {
//   try {
//     const res = await WP(`
//       query GetPostsByCategory($categoryId: Int, $first: Int, $after: String) {
//         posts(
//           first: $first
//           after: $after
//           where: {categoryId: $categoryId}
//         ) {
//           edges {
//             node {
//               id
//               title
//               slug
//               featuredImage {
//                 node {
//                   altText
//                   mediaItemUrl
//                 }
//               }
//             }
//             cursor
//           }
//           pageInfo {
//             hasNextPage
//             endCursor
//           }
//         }
//       }
//     `, { categoryId, first, after });

//     if (!res?.data) {
//       throw new Error("Could not fetch posts for category");
//     }

//     return res.data.posts;
//   } catch (error) {
//     console.error("Error fetching posts for category:", error);
//     throw error;
//   }
// }
