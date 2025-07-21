# Damijan Kante | Professional Portfolio

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/damijankante/damijankante.github.io/blob/main/LICENSE)
[![Built With React](https://img.shields.io/badge/Built%20With-React-61DAFB?logo=react)](https://react.dev/)
[![Styled With TailwindCSS](https://img.shields.io/badge/Styled%20With-TailwindCSS-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Powered By Vite](https://img.shields.io/badge/Powered%20By-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![Deployed With Vercel](https://img.shields.io/badge/Deployed%20With-Vercel-000000?logo=vercel)](https://vercel.com/) <!-- Or GitHub Pages if that's your primary deployment method -->

---

## 🚀 Overview

This is the personal portfolio website of **Damijan Kante**, a versatile professional with extensive experience spanning **Data Analysis, Graphic Design, and Full-Stack Development**.

Built with modern web technologies, this interactive platform showcases a curated selection of projects, skills, and professional experience designed to provide a comprehensive overview of my capabilities and journey.

## ✨ Features

*   **Multilingual Support:** Content available in English, German, and Slovenian, powered by `react-i18next` for a global audience.
*   **Dynamic Project Galleries:**
    *   Interactive modals for each project displaying a dedicated image gallery.
    *   Hover effects reveal project-specific descriptions directly on thumbnails.
    *   Clickable thumbnails open a full-screen lightbox view of the image.
*   **Automated Asset Loading:** Project cover images and gallery images are dynamically loaded from structured folders (`src/assets/images/covers/` and `src/assets/images/galleries/`) using `import.meta.glob`, streamlining content management.
*   **Responsive Design:** Optimized for seamless viewing across all devices, from mobile phones to large desktop displays.
*   **Theme Switching:** Supports Light, Dark, and a unique Low-Light theme for personalized user experience.
*   **SEO Optimized:**
    *   Dynamic meta tags (`<title>`, `<meta name="description">`, `<html lang>`) using `react-helmet-async` for multilingual SEO.
    *   Semantic HTML5 structure (`h1`, `h2`, `h3`) and descriptive `alt` tags for improved search engine visibility.
    *   Comprehensive favicon setup for all platforms.
*   **Interactive Contact Form:** A functional contact form powered by EmailJS for direct communication.
*   **Smooth Scrolling Navigation:** Intuitive navigation with smooth transitions between sections.

## 🛠️ Technologies Used

### Frontend
*   **React:** A declarative, component-based JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and developer experience.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **shadcn/ui:** A collection of re-usable components built with Radix UI and Tailwind CSS, providing accessible and customizable UI primitives.
*   **react-router-dom:** Declarative routing for React.
*   **react-i18next:** A powerful internationalization framework for React.
*   **lucide-react / react-icons:** High-quality, customizable open-source icon libraries.
*   **react-helmet-async:** For managing document head tags (title, meta, etc.) in a React app.
*   **@tanstack/react-query:** For efficient data fetching and caching.

### Build Tool
*   **Vite:** A next-generation frontend tooling that provides an extremely fast development experience.

### Backend/Services
*   **EmailJS:** For handling client-side email sending without needing a backend server.

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn (npm is used in instructions)
*   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/damijankante/damijankante.github.io.git
    cd damijankante.github.io
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Set up Environment Variables (for Contact Form):**
    The contact form uses EmailJS. You'll need to create a `.env.local` file in the root of your project and add your EmailJS API keys:

    ```dotenv
    VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
    ```
    (Replace `your_..._id` with your actual keys from [EmailJS](https://www.emailjs.com/).)

4.  **Organize Your Assets:**
    Place your project cover images and gallery images in the following structured directories:
    ```
    src/assets/images/
    ├── covers/                  # For main project cover images
    │   ├── graphic-magazine-design.png
    │   ├── coding-portfolio.png
    │   └── data-sales-dashboard.png
    │   └── ... (match filenames to project IDs)
    │
    └── galleries/               # For project gallery images (subfolders per project ID)
        ├── graphic-magazine-design/
        │   ├── 01-page-spread.jpg
        │   ├── 02-another-view.png
        │   └── ... (numbered for order)
        │
        └── coding-portfolio/
            ├── 01-homepage.jpg
            └── ...
    ```

5.  **Setup Favicons & Social Preview Image:**
    *   Place all generated favicon files (from [RealFaviconGenerator.net](https://realfavicongenerator.net/)) directly into the `public/` directory.
    *   Place your social media preview image (`social-preview.jpg` or `.png`, recommended 1200x630px) into the `public/` directory as well.
    *   Ensure `public/index.html` has the correct `href` attributes for these (absolute URLs pointing to your live domain, e.g., `https://yourdomain.com/social-preview.jpg`).

### Local Development

To run the project in development mode:
```bash
npm run dev
# or yarn dev