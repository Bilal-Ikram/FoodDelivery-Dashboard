# React + Vite
## Usage
    port: 5174, // Run on port 5174 for frontend of dashboard.
http://dashboard.localhost:5174/

### Install dependencies
npm create vite@latest
// react dependencies
npm install lucide-react react react-dom react-router-dom
npm install @mantine/core @mantine/hooks

// Install tailwindcss and its peer dependencies via npm, and create your tailwind.config.js file.
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

// Create a new file named tailwind.config.js
touch tailwind.config.js

// Add the following content to tailwindcss.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

Add tailwindcss and autoprefixer to your postcss.config.js file, or wherever PostCSS is configured in your project.
// Create a new file named postcss.config.js
touch postcss.config.js

// Add the following content to postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


Add the @tailwind directives for each of Tailwind’s layers to your main CSS file.
// Create a new file named index.css in src

// Add the following content to index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

//flowbite
npm i flowbite-react

//Add the Flowbite React content path and plugin to tailwind.config.js:
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    flowbite.content(),
  ],
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};


//Final look of tailwind.config.js
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}

