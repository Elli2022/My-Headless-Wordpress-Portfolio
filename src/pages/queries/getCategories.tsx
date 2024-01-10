// getCategories.tsx
import WP from "../api/wp";

export default async function getCategories() {
  try {
    const res = await WP(`
      query {
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
