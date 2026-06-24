import { useEffect, useState } from "react";
import api from "../api/axios";
import BlogCard from "../components/BlogCard/BlogCard";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/blogs")
      .then((res) => setBlogs(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">Blog & Actualités</h1>

        {loading ? (
          <p className="text-center">Chargement...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;