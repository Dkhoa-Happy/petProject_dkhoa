<div align="center">
  <br />
    <a href="https://petproject-deploy-v3-1s3rb69zy-dang-khoas-projects-444bf235.vercel.app/" target="_blank">
      <img src="https://cloud.appwrite.io/v1/storage/buckets/6759845a00023e9da43a/files/67809fed0008dcb6a8cc/view?project=67597a160036fc9160b4" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=react&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />

  </div>

<h3 align="center">Post & User Manager Platform</h3>

   
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets (Code to Copy)](#snippets)
6. 🔗 [Assets](#links)
7. 🚀 [Web Link To View](#web)



## <a name="introduction">🤖 Introduction</a>

In today’s digital age, your online presence is more crucial than ever. Whether you're a seasoned blogger, an emerging influencer, or a business aiming to amplify your brand voice, we are here to simplify and elevate your blogging experience. Our platform is designed to be your all-in-one solution, ensuring that managing your website and blog is not only efficient but also enjoyable.


## <a name="tech-stack">⚙️ Tech Stack</a>

- React 19
- Next.js 15
- TailwindCSS
- ShadCN
- TypeScript

## <a name="features">🔋 Features</a>

👉 **Live Content API**: Displays the latest post ideas dynamically on the homepage using GoRest API.

👉 **Post Submission**: Admin can submit post ideas, including title, body, user_id, and multimedia links (image).

👉 **Post Details Page**: Click on any post to view its details, with title and body displayed.

👉 **All User Page**: Admin can view the list of users and view their post invidually.

👉 **Editor Post**: Admins can highlight top post ideas.

👉 **Search**: Search functionality to load and view post efficiently.

👉 **Minimalistic Design**: Fresh and simple UI with only the essential pages for ease of use and a clean aesthetic.

and many more, including the latest **React 19**, **Next.js 15** features alongside code architecture and
reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Dkhoa-Happy/post.git
cd post
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.ts</code></summary>

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: {
          "100": "#8af2ff",
          DEFAULT: "#46A5CE",
        },
        secondary: "#FBE843",
        black: {
          "100": "#333333",
          "200": "#141413",
          "300": "#7D8087",
          DEFAULT: "#000000",
        },
        white: {
          "100": "#F7F7F7",
          DEFAULT: "#FFFFFF",
        },
        light: {
          "100": "#333F4E",
          "200": "#A3B2C7",
          "300": "#F2F5F9",
          "400": "#F2F4F8",
        },
      },
      fontFamily: {
        "work-sans": ["var(--font-work-sans)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(70, 165, 206)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
```

</details>

<details>
<summary><code>globals.css</code></summary>

```css
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --radius: 0.5rem;
  }
}

@layer utilities {
  .c-space {
    @apply sm:px-10 px-5;
  }

  .flex-between {
    @apply flex justify-between items-center;
  }

  .text-30-extrabold {
    @apply text-[20px] font-extrabold text-white;
  }

  .text-30-bold {
    @apply text-[30px] font-bold text-black;
  }

  .text-30-semibold {
    @apply font-semibold text-[30px] text-black;
  }

  .text-26-semibold {
    @apply font-semibold text-[26px] text-black;
  }

  .text-24-black {
    @apply text-[20px] font-black text-black;
  }

  .text-20-medium {
    @apply font-medium text-[20px] text-black;
  }

  .text-16-medium {
    @apply font-medium text-[16px] text-black;
  }

  .text-14-normal {
    @apply font-normal text-sm text-white-100/80;
  }

  .blue_container {
    @apply w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6;
  }

  .tag {
    @apply bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri;
  }

  .heading {
    @apply uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5;
  }

  .sub-heading {
    @apply font-medium text-[20px] text-white max-w-2xl text-center break-words;
  }

  .section_container {
    @apply px-6 py-10 max-w-7xl mx-auto;
  }

  .card_grid {
    @apply grid md:grid-cols-3 sm:grid-cols-2 gap-5;
  }

  .card_grid-sm {
    @apply grid sm:grid-cols-2 gap-5;
  }

  .no-result {
    @apply text-black-100 text-sm font-normal;
  }

  /* profile */
  .profile_container {
    @apply w-full pb-10 pt-20 px-6 max-w-7xl mx-auto lg:flex-row flex-col flex gap-10;
  }

  .profile_card {
    @apply w-96 px-6 pb-6 pt-20 flex flex-col justify-center items-center bg-primary border-[5px] border-black shadow-100 rounded-[30px] relative z-0 h-fit max-lg:w-full;
  }

  .profile_title {
    @apply w-11/12 bg-white border-[5px] border-black rounded-[20px] px-5 py-3 absolute -top-9 after:absolute after:content-[''] after:-top-1 after:right-0 after:-skew-y-6 after:bg-black after:-z-[1] after:rounded-[20px] after:w-full after:h-[60px] before:absolute before:content-[''] before:-bottom-1 before:left-0  before:-skew-y-6 before:w-full before:h-[60px] before:bg-black  before:-z-[1] before:rounded-[20px] shadow-100;
  }

  .profile_image {
    @apply rounded-full object-cover border-[3px] border-black;
  }

  /* idea details */
  .divider {
    @apply border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto;
  }

  .view_skeleton {
    @apply bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3;
  }

  /* navbar */
  .avatar {
    @apply p-0 focus-visible:ring-0 bg-none rounded-full drop-shadow-md !important;
  }

  .dropdown-menu {
    @apply w-56 border-[5px] border-black bg-white p-5 rounded-2xl !important;
  }

  .button {
    @apply text-[14px] leading-[20px] font-medium;
  }



  /* searchform */
  .search-form {
    @apply max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5;
  }

  .search-input {
    @apply flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none;
  }

  .search-btn {
    @apply size-[50px] rounded-full bg-black flex justify-center items-center !important;
  }

  /* User Table */
  .user-table {
    @apply bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200  transition-all duration-500;
  }

  .primary-btn {
    @apply bg-blue-400 hover:bg-blue-500 transition-all rounded-full button !important;
  }

  /* Post Card */
  .post {
    @apply bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100;
  }

  .post_date {
    @apply font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full group-hover:bg-white-100;
  }

  .post_desc {
    @apply font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all;
  }

  .post_img {
    @apply w-full h-[164px] rounded-[10px] object-cover;
  }

  .post_btn {
    @apply rounded-full bg-black-200 font-medium text-[16px] text-white px-5 py-3 !important;
  }

  .post_skeleton {
    @apply w-full h-96 rounded-[22px] bg-zinc-400;
  }

  /* postform */
  .post-form {
    @apply max-w-2xl mx-auto bg-white my-10 space-y-8 px-6;
  }

  .post-form_label {
    @apply font-bold text-[18px] text-black uppercase;
  }

  .post-form_input {
    @apply border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 !important;
  }

  .post-form_textarea {
    @apply border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300 !important;
  }

  .post-form_error {
    @apply text-red-500 mt-2 ml-5;
  }

  .post-form_editor {
    @apply mt-3 border-[3px] border-black text-[18px] text-black font-semibold placeholder:text-black-300 !important;
  }

  .post-form_btn {
    @apply bg-primary border-[4px] border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px] !important;
  }

  /* view */
  .view-container {
    @apply flex justify-end items-center mt-5 fixed bottom-3 right-3;
  }

  .view-text {
    @apply font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-lg capitalize;
  }

  .category-tag {
    @apply font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full;
  }

  .pattern {
    background-image: linear-gradient(
      to right,
      transparent 49.5%,
      rgba(251, 232, 67, 0.2) 49.5%,
      rgba(251, 232, 67, 0.6) 50.5%,
      transparent 50.5%
    );
    background-size: 5% 100%;
    background-position: center;
    background-repeat: repeat-x;
  }

  .tag-tri {
    @apply before:content-[''] before:absolute before:top-2 before:left-2 before:border-t-[10px] before:border-t-black before:border-r-[10px] before:border-r-transparent after:content-[''] after:absolute after:bottom-2 after:right-2 after:border-b-[10px] after:border-b-black after:border-l-[10px] after:border-l-transparent;
  }
}

.w-md-editor-toolbar {
  padding: 10px !important;
}

/* =====  SHADCN OVERRIDES */
.shad-no-focus {
  @apply outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important;
}

.shad-dropdown-item {
  @apply cursor-pointer !important;
}

.shad-dialog button {
  @apply focus:ring-0 focus:ring-offset-0 focus-visible:border-none outline-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 !important;
}

.delete-confirmation {
  @apply text-center text-light-100 !important;
}

.modal-cancel-button {
  @apply h-[52px] flex-1 rounded-full bg-white text-light-100 hover:bg-transparent !important;
}
.modal-submit-button {
  @apply primary-btn !mx-0 h-[52px] w-full flex-1 !important;
}

/*  footer */
.social-icon {
  @apply w-12 h-12 rounded-full flex justify-center items-center bg-black-300 border border-black-200;
}
```

</details>

<details>
<summary><code>lib/utils.ts</code></summary>

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

</details>

<details>
<summary><code>lib/validation.ts</code></summary>

```typescript
import { z } from "zod";

export const formSchema = {
  title: z.string().min(3).max(100),
  body: z.string().min(20).max(500),
};
```

</details>

## <a name="web">🚀 Web Link</a>

<a href="https://petproject-deploy-v3-1s3rb69zy-dang-khoas-projects-444bf235.vercel.app/" target="_blank">
      Link Website
    </a>




## <a name="links">🔗 Assets</a>

- Fonts and Assets used in the project can be found [here](https://drive.google.com/drive/folders/1kmjb4N_-WSai1zWL_KqewEorkPRi5UK4?usp=sharing)
