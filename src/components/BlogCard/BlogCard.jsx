import { Link } from "react-router-dom";

function BlogCard({ article }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
      <img
        src={article.image_url || "/blog/placeholder.jpg"}
        alt={article.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">
        <p className="text-gray-500 text-sm">
          {article.published_at ? new Date(article.published_at).toLocaleDateString("fr-FR") : ""}
        </p>

        <h2 className="text-2xl font-bold mt-3">{article.title}</h2>
        <p className="mt-4 text-gray-600">{article.excerpt}</p>

        <Link to={`/blog/${article.id}`} className="inline-block mt-6 text-yellow-600 font-bold">
          Lire l'article →
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;