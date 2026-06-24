function BlogTable({ blogs, onDelete, onEdit, onToggle }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-4">Image</th>
            <th className="p-4">Titre</th>
            <th className="p-4">Catégorie</th>
            <th className="p-4">Date</th>
            <th className="p-4">Statut</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className={`border-b ${!blog.is_active ? "opacity-50" : ""}`}>
              <td className="p-4">
                {blog.image_url ? (
                  <img src={blog.image_url} alt="" className="w-24 h-16 object-cover rounded" />
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="p-4">{blog.title}</td>
              <td className="p-4">{blog.category || "—"}</td>
              <td className="p-4">
                {blog.published_at ? new Date(blog.published_at).toLocaleDateString("fr-FR") : "—"}
              </td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  blog.is_active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                }`}>
                  {blog.is_active ? "Visible" : "Masqué"}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => onToggle(blog.id)} className="bg-gray-700 text-white px-4 py-2 rounded">
                    {blog.is_active ? "Masquer" : "Afficher"}
                  </button>
                  <button onClick={() => onEdit(blog)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Modifier
                  </button>
                  <button onClick={() => onDelete(blog.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BlogTable;