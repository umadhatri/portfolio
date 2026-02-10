# 🌐 Portfolio Website

Welcome to my personal portfolio repository!

This site showcases my work, projects, and skills, and is built using **React + Tailwind CSS**, then deployed as a **static site on GitHub Pages**.

🔗 **Live site:**  
https://umadhatri.github.io/portfolio/

---

## Tech Stack

- **Framework:** React (Create React App)
- **Styling:** Tailwind CSS
- **UI Components:** Custom components + shadcn-style primitives
- **Build Tooling:** CRACO
- **Hosting:** GitHub Pages (static deployment)

---

## Repository Structure

This repository intentionally separates **development code** from **deployed output**.

```text
portfolio/
├── index.html          # Production entry point (served by GitHub Pages)
├── static/             # Compiled JS & CSS assets
├── robots.txt
├── README.md
└── frontend/           # Development source code
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   ├── lib/
    │   ├── App.js
    │   └── index.js
    ├── public/
    ├── package.json
    ├── package-lock.json
    ├── craco.config.js
    ├── tailwind.config.js
    └── postcss.config.js
````

### How this works

* **GitHub Pages** serves files from the repository root
* The root `index.html` and `static/` directory are **generated build artifacts**
* All development happens inside the `frontend/` folder
* The production files should **never be edited by hand**

---

## Local Development

All development commands are run from the `frontend/` directory.

### Prerequisites

* Node.js **v16.x** (recommended for compatibility)
* npm (bundled with Node)

### Install dependencies

```bash
cd frontend
npm install --legacy-peer-deps
```

### Run the dev server

```bash
npm start
```

This starts the app at:

```
http://localhost:3000
```

---

## Building for Production

To generate the static files used by GitHub Pages:

```bash
cd frontend
npm run build
```

This creates:

```text
frontend/build/
├── index.html
└── static/
```

---

## Deploying to GitHub Pages (Manual)

Deployment is intentionally manual for clarity and control.

1. Run the production build
2. Copy **contents** of `frontend/build/`
3. Paste them into the **repository root**
4. Commit and push

GitHub Pages automatically serves the site from the `main` branch root.

---

## Notes

* ESLint warnings during build do **not** affect production output
* Tailwind CSS is fully compiled during the build step
* No backend or server-side rendering is used
* This repository contains both **source code** and **deployment artifacts** by design

---

## License

This project is for personal and portfolio use.
