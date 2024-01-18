This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# My Headless Wordpress Portfolio

### Description
This project is part of my work during the internship LIA 1. It is a web application built with Headless WordPress and React (using Next.js) to showcase a dynamic portfolio. The web application includes features such as pagination, filtering posts by category, and a freelance section.

### Technologies Used
* React
* Next.js
* Headless WordPress
* Tailwind CSS

### Installation
* Clone the repo: git clone [repo-url]
* Install dependencies: npm install or yarn install
* Run the application: npm run dev or yarn dev

### Features

* Dynamic navigation menu based on page data
* Automatically generated post cards based on WordPress data
* Category filtering for posts
* Pagination controls
* Link to the GitHub project
* Freelance project section with information and contact link


### Contributing

* Fork the project
* Create a new branch (git checkout -b feature/AmazingFeature)
* Commit your changes (git commit -m 'Add some AmazingFeature')
* Push to the branch (git push origin feature/AmazingFeature)
* Open a Pull Request


## Project/[slug]/page.tsx

### Description

This page is responsible for presenting detailed project posts. It utilizes dynamic routing in Next.js to fetch and display information for each unique project based on its 'slug'.

### Functionality

- Dynamic Routing: The page uses Next.js's dynamic file-based routing to handle different project slugs.
- Data Fetching: Uses GraphQL queries to fetch specific project post data from a Headless WordPress backend.
- Component Structure:
  - Navigation: Displays a navigation menu.
  - ProjectPost: Renders the main content of the project post.
  - KeyFindings, PictureBlock, LiveWorkButton: Special components to display different parts of the project data.
- Static Generation: Implements generateStaticParams to generate static paths for each project.
Technologies and Libraries
- React and Next.js for frontend development.
- GraphQL and Headless WordPress for data management.
- Component-based architecture to structure the project content.
Example of Code Usage
- The generateStaticParams function fetches all slugs for project posts and generates static paths.
- The component uses state and effects to manage and dynamically present data based on the current URL.


#### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
