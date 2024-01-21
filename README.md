This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# My Headless Wordpress Portfolio

## Introduction
This project is a part of my work during my internship at Capace Media Group AB. It is a dynamic web application built with Headless WordPress and React (with Next.js) and aims to showcase a portfolio. The project utilizes Tailwind CSS for stylish and responsive design.

## Technologies and Tools
- React/Next.js: For modern and efficient frontend development.
- Headless WordPress: As the backend and CMS for content management.
- Tailwind CSS: For responsive design and customizable styles.
- GraphQL: For handling data retrieval from WordPress.

## Components
The project includes several custom React components:

### Navigation
A navigation bar that uses Next.js' Link to handle routing between pages. It includes links to the homepage, about page, and contact information.

### Header
Displays a welcoming header and introductory text for the page, using HTML-formatted text to create custom styling and layout.

### Footer
A footer component that contains contact information and links, styled with Tailwind CSS for a unified appearance.

### PostsContainer
Presents a collection of posts or projects in a grid format. It handles both when posts are available and when no posts are found for a given category.

### ProjectPost
Details information about a specific project or post, including title, content, and a prominent image.

### Modal
A reusable modal component for displaying content over the existing page, providing a focused user experience.

### FilterCategory
Offers a method for filtering posts based on categories, with dynamic rendering of category buttons.

### ExploreButton and LiveWorkButton
Button components designed to direct users to a specific URL, used to encourage interaction and engagement.

### KeyFindings and PictureBlock
Presents key findings and images in an impactful way, ideal for highlighting project information or artwork.


## Project/[slug]/page.tsx
### Description
This page is responsible for presenting detailed project posts. It utilizes dynamic routing in Next.js to fetch and display information for each unique project based on its 'slug'.

### Functionality
- Dynamic Routing: The page uses Next.js's dynamic file-based routing to handle different project slugs.
- Data Fetching: Uses GraphQL queries to fetch specific project post data from a Headless WordPress backend.
- Component Structure:
  - **Navigation:** Displays a navigation menu.
  - **ProjectPost:** Renders the main content of the project post.
  - **KeyFindings**, PictureBlock, LiveWorkButton: Special components to display different parts of the project data.
- Static Generation: Implements generateStaticParams to generate static paths for each project.
Technologies and Libraries
- React and Next.js for frontend development.
- **GraphQL and Headless WordPress** for data management.
- **Component-based architecture** to structure the project content.
Example of Code Usage
- The generateStaticParams function fetches all slugs for project posts and generates static paths.
- The component uses state and effects to manage and dynamically present data based on the current URL.

# src/lib/wp.tsx
### Description
The wp.tsx file contains a helper function for performing GraphQL queries to a WordPress backend. This function is central to managing data retrieval from your Headless WordPress instance.

**Functionality**
-API Requests: Utilizes the fetch API to send requests to the WordPress backend.
-Dynamic Queries: Supports dynamic GraphQL queries and variables.
-Environment Variables: Uses an environment variable (process.env.wordpressApiKey) to store and reference the API key, providing a secure method for handling sensitive information.
-Error Handling: Includes basic error handling and logging to facilitate debugging.

**Usage in the Project**
-This function is used throughout the project to retrieve data, such as posts and page information, from WordPress. It provides a standardized and reusable method for interacting with the backend.



## getHome.tsx

### Description
The `getHome.tsx` file contains a function for retrieving data about the website from a Headless WordPress backend. The function uses GraphQL to query for specific page and its content.

**Functionality**
- **GraphQL Request:** Utilizes a GraphQL query to fetch detailed information about the website.
- **Data Retrieval:** Fetches data such as page title, content, links, and information about freelance projects and project galleries.
- **Dynamic URI Parameters:** The function takes a URI parameter to retrieve data for a specific page.

**Usage in the Project**
This function is crucial for fetching and presenting the main content of the website. It provides a centralized location for handling data retrieval from WordPress.

**Example**
Here's an example of how the `getHome` function can be used:

```javascript
getHome('home-uri').then(data => {
  console.log(data);
});
```


## getPages.tsx
### Description 
The `getPages.tsx` file contains an asynchronous function for fetching information about all pages from a Headless WordPress backend. The function uses GraphQL to query for pages and their attributes such as content, ID, slug, URI, and title.

**Functionality**
- **GraphQL Request:** Utilizes a GraphQL query to fetch information about all pages.
- **Data Retrieval:** Retrieves page information necessary for building navigation links and other page-related functions in the application.
- **Robust Error Handling:** Includes error handling to capture and log errors in case of failed API calls.

**Usage in the Project**
This function is central to creating a dynamic and interactive navigation in the web application. It facilitates code reuse by centralizing page retrieval logic.

**Example**
An example of how the `getPages` function can be used:

```javascript
getPages().then(data => {
  console.log(data);
});
```

---

## src/pages/queries/getPost.tsx

### Description
The `getPost.tsx` file contains an asynchronous function for fetching detailed information about a specific post from a Headless WordPress backend, based on its 'slug'. The function utilizes GraphQL to query post data, including custom fields and content blocks.

### Functionality
- **Custom GraphQL Request:** Sends a detailed GraphQL request to fetch a specific post with its associated information.
- **Dynamic Data Retrieval:** The function takes a 'slug' as a parameter and retrieves the corresponding post.
- **Multiple Content Handling:** Retrieves various types of content blocks, including images, key findings, and text content.
- **Error Handling:** Logs and handles any potential errors during data retrieval.

### Usage in the Project
This function is crucial for creating detailed pages for each project or blog post. It enables a rich presentation of content with different media and text formats.

### Example
An example of how the `getPost` function can be used:

```javascript
getPost('post-slug').then(data => {
  console.log(data);
});
```
---

## src/pages/queries/getPosts.tsx

### Description
The `getPosts.tsx` file contains an asynchronous function for fetching blog posts and related information from a Headless WordPress backend. The function utilizes GraphQL to query posts and includes handling for pagination and category filtering.

### Functionality
- **Flexible GraphQL Request:** Supports dynamic arguments such as page number, posts per page, and category ID for custom data retrieval.
- **Pagination:** Manages post pagination using `afterCursor` and `beforeCursor`.
- **Category Filtering:** Enables post filtering based on category using `databaseId`.
- **Structured Return Data:** Returns posts, page information objects, and categories for further use in the application.
- **Error Handling:** Includes error handling to capture and log errors in case of failed API calls.

### Usage in the Project
This function is used to fetch and display blog posts with the ability to paginate and filter based on categories, which is crucial for creating a dynamic and user-friendly blog experience.

### Example
An example of how the `getPosts` function can be used:

```javascript
getPosts(1, 6, "", "", "categoryId").then(data => {
  console.log(data);
});
```
---

## About Page (`AboutPage`)

### Description
The About Page (`AboutPage`) is designed to present personal information about the developer, including a brief description, contact details, and links to social media. The page uses a `Modal` component to create a distinctive visual presentation.

### Design and Layout
- **Background and Text:** The page has a dark background with white text, creating a strong contrast and easy-to-read text.
- **Navigation Link:** Includes a link back to the homepage (`Portfolio`).
- **Flexible Layout:** Uses flexbox to create a responsive layout that adapts to different screen sizes.
- **Personal Photo:** Displays a personal photo as a central visual element on the page.

### Key Components
- **Modal:** Used to encapsulate the entire content of the page.
- **Contact Information:** Presents the email address and encourages visitors to get in touch.
- **Social Media Links:** Includes links to LinkedIn, Instagram, and Facebook, making it easy for visitors to follow on various platforms.

### Example Code Usage
The code uses standard HTML and React/Next.js patterns to build the page's structure and style:

```jsx
<Link href="/home" className="text-white font-bold text-lg">
  Portfolio.
</Link>
...
<a href="mailto:my@gmail.com" className="text-white font-bold">
  my@gmail.com
</a>
...
<img src="/images/portfolioFoto.jpg" alt="" />
```
---

## ExploreButton Component

### Description
The `ExploreButton` is a reusable React component that creates a stylish button for directing users to a specified URL. The component is designed to be visually appealing and user-friendly, with easy integration into various parts of the application.

### Properties (`Props`)
- **buttonText:** The text displayed on the button.
- **buttonUrl:** The URL to which the user will be redirected when the button is clicked.

### Design and Usage
- **Style:** The button has a blue background with white text, rounded corners, and a shadow to create depth, giving it a modern and engaging look.
- **Responsiveness:** Uses `inline-block` to ensure the button is responsive and works well on different screen sizes.
- **Animation:** Includes a transition effect to make visual changes smoother when the user interacts with the button.

### Example Code Usage
The component can be easily integrated into other parts of the application:

```jsx
<ExploreButton
  buttonText="See More"
  buttonUrl="https://www.example.com"
/>
```
---

## FilterCategory Component

### Description
`FilterCategory` is a React component used to present a set of category filtering buttons. The component is designed to allow users to easily filter content based on categories by interacting with the buttons.

### Functionality
- **Next.js Routing:** Uses the Next.js `useRouter` hook to handle navigation to different category pages.
- **Category Click Handling:** Each category is represented by a button that, when clicked, navigates the user to a page filtered by the selected category.
- **Dynamic Rendering:** Renders a set of buttons based on the categories passed as `props`.

### Usage in the Project
The component enhances the user experience by providing a simple and intuitive way to filter content by category. This is particularly useful in applications with a large number of posts or articles.

### Example Code Usage
The component can be used as follows:

```jsx
<FilterCategory
  categories={[{ databaseId: 1, name: 'Category 1' }, { databaseId: 2, name: 'Category 2' }]}
/>
```

### Design and Style
- **Styling:** Uses Tailwind CSS for responsive styling and interactive effects such as hover and focus rings.
- **Responsiveness:** Adjusts button sizes for different screen sizes using Tailwind classes.

---

## Footer Component

### Description
The `Footer` component is an elegant and functional footer for the web application. It includes contact information and links, making it easy for users to find ways to contact or follow the company or project.

### Design and Layout
- **Styling:** Uses Tailwind CSS to create a responsive and aesthetically pleasing footer.
- **Flexible Layout:** Utilizes Flexbox to adjust the layout depending on screen size, with a column layout for smaller screens and a row layout for larger screens.
- **Links:** Includes an email address and LinkedIn link with hover effects for an enhanced user experience.

### Usage in the Project
This footer is a reusable component that can be included on all pages of the application to provide a consistent user experience and easily accessible contact information.

### Example Code Usage
The component can be easily integrated into a page:

```jsx
<Footer />
```

---

## FreelanceSection Component

### Description
The `FreelanceSection` is a specialized React component that presents information about freelance projects or services. It is designed to capture the attention of visitors with a clear title, descriptive text, and a call-to-action button.

### Properties (`Props`)
- **freelanceTitle:** The title for the freelance section.
- **freelanceDescription:** A descriptive text about the freelance offering or services.
- **freelanceContactUrl:** URL for contact or more information.
- **freelanceProjectsButton:** The text on the button that encourages action.

### Design and Usage
- **Visual Appeal:** Uses a combination of text sizes and bold styling to create a visually appealing section.
- **CTA Button:** Includes a 'Call To Action' button that encourages the user to find out more or contact for freelance projects.
- **Styling:** Uses Tailwind CSS to give the button a distinct appearance and transition effects for interactivity.

### Example Code Usage
The component can be integrated into a page to highlight freelance offerings:

```jsx
<FreelanceSection
  freelanceTitle="Freelance Projects"
  freelanceDescription="Unique and customized solutions for your business"
  freelanceContactUrl="mailto:contact@example.com"
  freelanceProjectsButton="Contact Me"
/>
```
---

## Header Component

### Description
The `Header` component is a central part of the web application's layout, presenting a welcoming title and introductory text. This component is designed to provide an immediate visual impact when the user visits the page.

### Properties (`Props`)
- **titleHtml:** HTML-formatted title text that can include tags for custom formatting.
- **presentingText:** A brief introductory text displayed above the title.

### Design and Usage
- **Text Presentation:** Uses HTML formatting for the title to allow custom styling and layout.
- **Responsive Size:** Adjusts text size for different devices using responsive classes (e.g., `sm:text-8xl` for small devices).
- **Central Placement:** Positions the text centrally on the page to capture the user's attention.

### Example Code Usage
The component can be used to create an impactful headline on a page:

```jsx
<Header
  titleHtml="<span>Highlighting Title</span>"
  presentingText="Welcome to My Website"
/>
```

---

## KeyFindings Component

### Description
The `KeyFindings` is a React component aimed at presenting key findings or insights in an organized and clear manner. It is designed to categorize information into sections like 'Basics', 'Goals', 'Problems', and 'Solutions', making it easy for users to quickly grasp the core points of a project or topic.

### Properties (`Props`)
- **keyFindingsBlock:** An object containing text fields for each category of information: basics, goals, problems, and solutions.

### Design and Layout
- **Grid Layout:** Uses CSS Grid to structure the information in a two-column layout that adapts to different screen sizes.
- **Typographic Details:** Uses different text sizes and style levels to create hierarchy and improve readability.
- **Aesthetic Design:** Includes a minimalist design with rounded corners and a light background to make the information more visually appealing.

### Example Code Usage
The component can be used to display summarized information about a project or study:

```jsx
<KeyFindings
  keyFindingsBlock={{
    basics: "Basic Information",
    basicstext: "Detailed description of basic aspects.",
    goals: "Goals",
    goalstext: "Specific objectives the project aims to achieve.",
    problems: "Problems",
    problemstext: "Challenges and obstacles encountered.",
    solutions: "Solutions",
    solutionstext: "Approaches and solutions to the problems."
  }}
/>
```
---

## LiveWorkButton Component

### Description
The `LiveWorkButton` is a customizable React button component designed to direct users to a specific URL. It's crafted to be eye-catching and user-friendly, encouraging interaction and engagement.

### Properties (`Props`)
- **buttonText:** The text displayed on the button, providing users with an indication of what will happen when clicked.
- **buttonUrl:** The URL to which the user will be redirected upon clicking the button.

### Design and Usage
- **Visual Appeal:** The button features a bright blue background with white text, creating a strong visual contrast.
- **Size Adaptability:** Support for different text sizes and padding depending on screen size, ensuring good readability and usability across various devices.
- **Interactive Effects:** Includes an arrow icon and transition effects to enhance the user experience.

### Example Code Usage
The component can be easily integrated wherever an action button is needed:

```jsx
<LiveWorkButton
  buttonText="See the Project Live"
  buttonUrl="https://www.example.com"
/>
```
---
## Modal Component

### Description
The `Modal` is a flexible and reusable React component used to create a modal dialog box. This component is designed to display content or interactions above the existing page, providing a focused user experience.

### Functionality
- **User Interaction:** Allows users to dismiss the modal by clicking outside the content area or by pressing the 'Escape' key.
- **Flexibility:** Can contain any optional React component or HTML element as children (`children`), allowing customization of the modal's content.
- **Accessibility:** Includes a close button with a clear visual representation and an `aria-label` for accessibility.

### Design and Usage
- **Dimmed Background:** Uses a semi-transparent black background to distinguish the modal content from the rest of the page.
- **Close Button:** Presents a clear close button in the upper right corner of the modal.
- **Centered Content:** Centers the content within the modal to capture the user's attention.

### Example Code Usage
The component can be used to create a modal dialog on any page of the application:

```jsx
<Modal>
  <p>Here is some important content!</p>
</Modal>
```
---
## Navigation Component

### Description
The `Navigation` component is a central part of the web application's user interface, designed to provide users with a simple and intuitive navigation experience. The component includes links to main pages such as 'Portfolio,' 'About Us,' and 'Contact.'

### Properties (`Props`)
- **portfolioLink, aboutLink, contactLink:** Objects containing the ID, title, and URI for each navigation link.

### Design and Layout
- **Flexible Layout:** Uses Flexbox to position navigation links in a balanced and responsive manner.
- **Visually Appealing Links:** Styled links that change color on hover to enhance the user experience.
- **Clear Structure:** Divides navigation links into 'left' and 'right' sections for easy orientation.

### Usage in the Project
The component is used to create a consistent navigation structure across the entire website, making it easy for users to find and navigate to different sections.

### Example Code Usage
The component can be integrated into a layout component or higher-order component to be included on all pages:

```jsx
<Navigation
  portfolioLink={{ id: "1", title: "Portfolio", uri: "/portfolio" }}
  aboutLink={{ id: "2", title: "About Us", uri: "/about" }}
  contactLink={{ id: "3", title: "Contact", uri: "/contact" }}
/>
```
---
## NextProjectText Component

### Description
The `NextProjectText` component is a simple and functional React component designed to display text messages in an impactful way. It is particularly useful for highlighting messages like "Next Project" or similar prompts in a web application.

### Properties (`Props`)
- **text:** The string to be displayed. If no text value is provided, the component renders nothing.

### Design and Usage
- **Conditional Rendering:** Does not render anything if no text is provided, preventing unnecessary elements in the DOM.
- **Centered Placement:** Centers the text on the screen using absolute positioning, making it ideal for highlighting important messages.
- **Adjustable Text Size:** Uses different text sizes for different devices (from `text-xs` to `lg:text-3xl`), ensuring the message is easily readable on all screen sizes.

### Example Code Usage
The component can be used to add a brief information text to a page:

```jsx
<NextProjectText text="Discover Our Next Project" />
```
---
## PictureBlock Component

### Description
The `PictureBlock` component is a React component designed to display images in a visually appealing manner, complete with associated navigation links. This component is ideal for highlighting project images, artwork, or other visual elements in a web application.

### Properties (`Props`)
- **pictureBlock:** An object containing image information, including URL and alt text, as well as additional navigation options.

### Design and Layout
- **Image Display:** Utilizes full width to maximize the visual impact of the image.
- **Alt Text:** Includes alternative text for accessibility and SEO benefits.
- **Navigation Link:** Presents a link associating the image with additional content or actions, enhancing user engagement.
- **Aesthetic Background:** Adds a semi-transparent background to create depth and dimension.

### Example Code Usage
The component can be used to add an image section to a page with the option for navigation:

```jsx
<PictureBlock
  pictureBlock={{
    picture: {
      mediaItemUrl: "path/to/image.jpg",
      altText: "Descriptive Text"
    },
    replaceurl: "/next-page"
  }}
/>
```
---
## PostsContainer Component

### Description
The `PostsContainer` is a React component used to display a collection of posts in a grid format. This component is ideal for presenting blog posts, project portfolios, or other types of content in an organized and visually appealing layout.

### Properties (`Props`)
- **hasPosts:** A boolean indicating whether there are any posts to display.
- **filteredPosts:** An array of post objects to be displayed.

### Design and Layout
- **Grid Layout:** Utilizes CSS Grid to arrange the posts in a three-column structure.
- **Image Display:** prominently displays the main image of each post.
- **Responsive Design:** Adapts the layout for different screen sizes and devices.

### Usage in the Project
This component can be used on pages where posts or projects need to be presented in a neat and organized manner.

### Example Code Usage
The component can be used to create a page that displays a selection of posts:

```jsx
<PostsContainer
  hasPosts={true}
  filteredPosts={[
    {
      id: "1",
      title: "Post 1",
      slug: "post-1",
      featuredImage: { node: { mediaItemUrl: "image.jpg" }},
      PostInfo: { subtitle: "A brief description" }
    }
  ]}
/>
```
---
## ProjectPost Component

### Description
The `ProjectPost` is a React component used to present detailed information about a specific project or post. It includes functionalities for displaying a featured image and HTML-formatted content.

### Properties (`Props`)
- **postData:** An object containing the project's or post's title, content, and a URL to a featured image.

### Design and Layout
- **Image Display:** If a featured image is available, it is displayed as a full-width image at the top of the post.
- **HTML Content:** Displays HTML-formatted content in a secure manner using `dangerouslySetInnerHTML`.
- **Aesthetic Design:** Utilizes shadows and rounded corners to create an elegant and modern presentation.

### Usage in the Project
This component is useful for creating detailed views for individual projects or posts, providing users with a deeper understanding and insight into the presented material.

### Example Code Usage
The component can be used to display a project or post:

```jsx
<ProjectPost
  postData={{
    title: "Project Title",
    content: "<p>Here is detailed content about the project...</p>",
    featuredImage: {
      node: {
        mediaItemUrl: "path/to/image.jpg",
        slug: "project-slug"
      }
    }
  }}
/>
```

---
## Contact
Developer: Eleonora Nocentini Sköldebrink
Organization: Capace Media Group AB
Email: eleonora.nocentini@gmail.com

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

---

## Getting Started

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
