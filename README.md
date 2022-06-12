# server-explorer

This project is to prepare a server free application to explore server data with some functionalities such as login, sorting, searching.

# Highlights of the project setup

### This repo is setup using latest tools like:

1. ### vite -
   Is a build tool that aims to provide a faster and leaner development experience for modern web projects, it uses esbuild which way more faster than any other build tools [https://vitejs.dev/guide/]
2. ### react with typescript -
   Using Typescript to build our React applications will make our react applications more predictable as we will be able to catch a lot of errors at runtime (during compilation). [https://create-react-app.dev/docs/adding-typescript/]
   **some refs to answer why? :**
   [https://www.sitepoint.com/react-with-typescript-best-practices/]
   [https://www.section.io/engineering-education/building-a-react-app-with-typescript/#:~:text=Using%20Typescript%20to%20build%20our,at%20runtime%20(during%20compilation)]
3. ### redux-toolkit with typescript -
   Redux Toolkit makes it easier to write good Redux applications and speeds up development, by baking in our recommended best practices, providing good default behaviors, catching mistakes, and allowing you to write simpler code. Redux Toolkit is beneficial to all Redux users regardless of skill level or experience [https://redux-toolkit.js.org/usage/usage-with-typescript]
4. ### tailwind css -
   Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.
   It's fast, flexible, and reliable — with zero-runtime. [https://tailwindcss.com/docs/installation/using-postcss]
5. ### testing-library -
   The React Testing Library is a very light-weight solution for testing React components. It provides light utility functions on top of react-dom and react-dom/test-utils, in a way that encourages better testing practice [https://testing-library.com/docs/react-testing-library/intro/]
6. ### husky -
   Husky improves your commits.You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. [https://typicode.github.io/husky/#/]
7. ### prettier -
   An opinionated code formatter, It removes all original styling\* and ensures that all outputted code conforms to a consistent style. [https://prettier.io/docs/en/index.html]
   **why? :**
   You press save and code is formatted
   No need to discuss style in code review
   Saves you time and energy
8. ### pnpm -
   Saving disk space and boosting installation speed, save a lot of space on your disk proportional to the number of projects and dependencies, and you have a lot faster installations! [https://pnpm.io/next/motivation]

# Setup project in local enviornment

1. Git Clone Repo in local from url using below command
   ```bash
   git clone https://github.com/pbhati01/server-explorer.git
   ```
2. Go to server-explorer directory just created after git clone finishes.
   ```bash
   cd server-explorer
   ```
3. Install project packages required to setup project in local, it takes packages from package.josn In same directory execuet below steps:
   ```bash
   pnpm i
   ```
4. Launch application local enviornment, execute below command in same directory
   ```bash
   pnpm run dev
   ```
5. Open localhost:3000 in browser to access the application

# Usage

1. Post setup use below creadentials to login:
   username> tesonet
   password> partyanimal
   Click Login
2. It will take you to Server Details page:
   On this you can persom seraching, sorting by name or distance. at a time only one sorting works

# Run Tests

1. To run tests in local fo to same directory named server-explorer and run bwlow command
   ```bash
   pnpm test
   ```

# How it Looks

1. Login Page

![WhatsApp Image 2022-06-12 at 11 07 55 PM](https://user-images.githubusercontent.com/6111689/173245985-e597b7e1-b300-4a89-8cef-78c0e249e4f1.jpeg)

2. Server Details Page

![WhatsApp Image 2022-06-12 at 11 08 37 PM](https://user-images.githubusercontent.com/6111689/173245970-add6dac5-b516-445f-96ba-ab3dade6a0ad.jpeg)

