import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function BlogDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then((res) => setArticle(res.data.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-20">Chargement...</div>;

  if (notFound || !article) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-4xl font-bold">Article introuvable</h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <img
        src={article.image_url || "/blog/placeholder.jpg"}
        alt={article.title}
        className="w-full rounded-xl shadow-lg"
      />

      <p className="text-gray-500 mt-8">
        {article.published_at ? new Date(article.published_at).toLocaleDateString("fr-FR") : ""}
      </p>

      <h1 className="text-5xl font-bold mt-4">{article.title}</h1>

      <p className="mt-8 text-lg leading-relaxed text-gray-700">{article.content}</p>
    </div>
  );
}

export default BlogDetails;