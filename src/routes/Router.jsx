import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

/* FRONT */
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import Contact from "../pages/Contact";
import Quote from "../pages/Quote";
import TechnicalSolutions from "../pages/TechnicalSolutions";

/* ADMIN */
import Dashboard from "../admin/Dashboard";
import ProductsAdmin from "../admin/ProductsAdmin";
import ProjectsAdmin from "../admin/ProjectsAdmin";
import BlogAdmin from "../admin/BlogAdmin";
import QuotesAdmin from "../admin/QuotesAdmin";

import Login from "../admin/Login";
import ProtectedRoute from "../admin/ProtectedRoute";

export default function Router() {
  return (
    <BrowserRouter>

      <Routes>

        {/* FRONT */}

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/technical-solutions" element={<TechnicalSolutions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />

        </Route>

        {/* LOGIN ADMIN */}

        <Route path="/admin/login" element={<Login />} />

        {/* ADMIN PROTÉGÉ */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductsAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <ProjectsAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute>
              <BlogAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/quotes"
          element={
            <ProtectedRoute>
              <QuotesAdmin />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}