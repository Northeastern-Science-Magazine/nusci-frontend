# Northeastern Science Magazine Frontend

This repository acts as the frontend for a local environment. The architecture is as follows:

```md
┏━━━━━━━━━━━━━━┓                      ┏━━━━━━━━━━━━━━┓                    ┏━━━━━━━━━━━━━━┓
┃              ┃ -------------------> ┃              ┃ -----------------> ┃              ┃
┃              ┃   [HTTP Requests]    ┃              ┃   [DB Requests]    ┃              ┃
┃   Frontend   ┃                      ┃   Backend    ┃                    ┃   Database   ┃
┃   Server     ┃                      ┃   Server     ┃                    ┃   Instance   ┃
┃              ┃   [HTTP Responses]   ┃              ┃   [DB Responses]   ┃              ┃
┃              ┃ <------------------- ┃              ┃ <----------------- ┃              ┃
┗━━━━━━━━━━━━━━┛                      ┗━━━━━━━━━━━━━━┛                    ┗━━━━━━━━━━━━━━┛

     React                               Express.js                           MongoDB
     Tailwind                            Mongoose/MongoDB                     Docker
     Next.js                             Docker
```

# Running the Project
- This section defines how to start up the project, and run it on your local machine.

### 1. Clone the repository to your computer
- Navigate to this page, and click the "Code" button. Click the "HTTPS" tab, and copy the repository URL.
- Open Github Desktop, and click the "Add" option, and then "Clone Repository". Select the "URL" option, and paste the URL from Github.

### 2. Open the Project in Visual Studio Code
- Open the project directory in Visual Studio Code by either clicking "Open in Visual Studio Code" on Github Desktop, or launching Visual Studio Code, clicking "Open Folder", and navigating to the directory in which you cloned the project.
- Add the ```.env.local``` file to the root directory. This will define our important secret keys we use for authentication, and initialization of the project.

### 3. Run the Initialization Commands
- Open the terminal in VS Code and ensure that your current directory is the root of the project.
- Run the following command to install the project dependencies:
```properties
npm i
```

- Run the following command to start your local dev server. This enables hot-reloading of your application.
```
npm run dev
```

### 4. Utility Commands

- Run the following command to rebuild your next-project locally. You may need to run `npm run dev` again. 
```
npm run build
```

- Run the following command to open Storybook. This enables you to see the design system and component library.
```
npm run storybook
```

# Design Architecture

### 1. Design Language

- A design language is an opinionated standardization of the way design is communicated using words. For example, one might say "orange button", whilst another might say "rounded button, with an orange background and white text", whilst another may say "rounded button with a primary color of orange and secondary color of white". Whilst none of these descriptions may be wrong, they all take on different semantical understanding to how to describe a visual component. The language we choose, and the properties we imply with the language, define how we communicate our ideas. 

### 2. Component Library

- A component library is the translation of a design language into actual code. A component library serves as the basis for which to build larger visual blocks. 

- Our component library consists of two parts, the Primitives and the Non-Primitives. Primitive components are defined as the atomic building blocks of the application that have minimal or no sub-components within them. Non-Primitives are anything else, so components that are compound.

- Generally, any component in the design system should be used multiple places.Components that are page-specific do not belong to the design system. Should a page-specific component be used multiple times, then it can be promoted to the component library.

### 3. Design System

- A design system marries both a design language and a component library, which determines the way we communicate design, build components, draft new components, and generate new designs across the board. 

- The design system should be the standard to which designers create, and developers build. It is critical that there is a shared understanding of the fundamental design system to communicate and operate with least friction possible. 