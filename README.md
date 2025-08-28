# Tanmay Kalra Frontend Internship Assignment for Pixel Mind

## Live Demo

https://github.com/user-attachments/assets/2edb4395-d269-4f92-8869-2b6bafecf502




A responsive e-commerce product listing page built with **Next.js**, **React Query**, **Zustand**, **Tailwind CSS**, **React Hook Form**, and **Zod**.

## 🚀 Features

- **Product Display**
  - Products shown in a responsive grid layout.
  - Displays product image, name, price, and description.
  - Data fetched from [Fake Store API](https://fakestoreapi.com/).

- **Search & Filter**
  - Search products by name (client-side filtering).
  - Filter products by category.
  - Search & filter states managed globally using **Zustand**.

- **Product Details**
  - Clicking a product opens a responsive modal with full details.
  - Modal has a close button.

- **Add Product Form (Mock)**
  - Form to "add" products with fields: Title, Price, Description, Category, and Image URL.
  - Uses **React Hook Form** with **Zod** validation.
  - Data submission is simulated (no backend integration).

- **Optional: Shopping Cart**
  - Add products to a cart.
  - Cart state managed with Zustand.
  - Floating icon shows number of items in the cart.

## 🛠️ Tech Stack
- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Query](https://tanstack.com/query/latest) - Data fetching
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Fake Store API](https://fakestoreapi.com/) - Product Data


## 🔗 API Endpoints
- **Get All Products**: `https://fakestoreapi.com/products`
- **Get Categories**: `https://fakestoreapi.com/products/categories`
- **Get Products by Category**: `https://fakestoreapi.com/products/category/{category}`
- **Get Single Product Details**: `https://fakestoreapi.com/products/{id}`

## 🛠️ Installation

```bash
# Clone this repository
git clone <repo-url>

# Navigate to project directory
cd project-name

# Install dependencies
npm install

# Run development server
npm run dev
