# React Product Catalog

## Overview

React Product Catalog is a responsive e-commerce web application built with React and TypeScript. It provides an intuitive interface for browsing mobile devices and accessories, exploring product details, and managing favorites and a shopping cart.

The application includes search, sorting, pagination, product recommendations, and interactive sliders to make product discovery easier. Favorites and cart data are persisted using `localStorage`, allowing users to retain their selections between sessions.

## Demo

- **[Live Demo](https://dimon2202.github.io/react-phone-store/)**
- **[GitHub Repository](https://github.com/dimon2202/react-phone-store)**

## Key Features

- **Product Catalog:** Browse phones, tablets, and accessories.
- **Search, Sorting & Pagination:** Find products and navigate catalog results efficiently.
- **Product Details:** View individual product information and suggested products.
- **Shopping Cart:** Add products, update quantities, and manage cart items.
- **Favorites:** Save and manage favorite products.
- **Data Persistence:** Store cart and favorites data in `localStorage`.
- **Interactive Sliders:** Explore products through carousel components powered by Swiper.
- **Client-Side Routing:** Navigate between pages using React Router.
- **Responsive Design:** Adapt the interface to different screen sizes.

## Challenges

Developing the application involved combining multiple e-commerce features into a consistent and user-friendly interface.

### Key Challenges

- **State Persistence:** Keeping cart and favorites data synchronized with `localStorage`.
- **Catalog Navigation:** Integrating search, sorting, and pagination for a smooth browsing experience.
- **Component Reusability:** Organizing the interface into reusable React components with modular styles.
- **Responsive UI:** Ensuring consistent layouts and interactions across different screen sizes.
- **Interactive Components:** Integrating product sliders and navigation while maintaining a cohesive user experience.

## Technologies Used

- **React & TypeScript** — Component-based UI development and type safety.
- **Vite** — Development server and build tooling.
- **React Router** — Client-side routing and navigation.
- **Bulma & Sass (SCSS)** — Layout, styling, and responsive design.
- **CSS Modules** — Component-scoped styles.
- **Swiper** — Interactive product carousels.
- **Cypress** — End-to-end testing.
- **ESLint, Prettier & Stylelint** — Code quality, formatting, and style consistency.

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dimon2202/react-phone-store.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-phone-store
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

## Build

Create a production build:

```bash
npm run build
```
