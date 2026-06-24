import { useEffect, useState } from "react";

import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";
import BlogForm from "../components/BlogForm/BlogForm";
import BlogTable from "../components/BlogTable/BlogTable";
import api from "../api/axios";

function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBlogs = () => {
    setLoading(true);
    api.get("/blogs")
      .then((res) => setBlogs(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleSaved = () => {
    setEditingBlog(null);
    loadBlogs();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      loadBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.patch(`/blogs/${id}/toggle`);
      loadBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Gestion Blog</h1>

          <BlogForm
            onSaved={handleSaved}
            editingBlog={editingBlog}
            onCancel={() => setEditingBlog(null)}
          />

          {loading ? (
            <p>Chargement...</p>
          ) : (
            <BlogTable
              blogs={blogs}
              onEdit={(b) => {
                setEditingBlog(b);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogAdmin;