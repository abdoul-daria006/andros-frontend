import { useEffect, useState } from "react";
import api from "../../api/axios";

function BlogForm({ onSaved, editingBlog, onCancel }) {
  const emptyForm = {
    title: "",
    category: "",
    excerpt: "",
    content: "",
    published_at: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || "",
        category: editingBlog.category || "",
        excerpt: editingBlog.excerpt || "",
        content: editingBlog.content || "",
        published_at: editingBlog.published_at ? editingBlog.published_at.slice(0, 10) : "",
      });
      setImagePreview(editingBlog.image_url || null);
      setImageFile(null);
    } else {
      setFormData(emptyForm);
      setImagePreview(null);
      setImageFile(null);
    }
  }, [editingBlog]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageFile = (file) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    if (imageFile) data.append("image", imageFile);

    try {
      if (editingBlog) {
        data.append("_method", "PUT");
        await api.post(`/blogs/${editingBlog.id}`, data);
      } else {
        await api.post("/blogs", data);
      }
      onSaved();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        console.error(err);
        setErrors({ general: [err.response?.data?.message || "Une erreur est survenue, vérifiez la console."] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8">

      <div>
        <input
          placeholder="Titre"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-1"
          required
        />
        {errors.title && <p className="text-red-600 text-sm mb-3">{errors.title[0]}</p>}
      </div>

      <input
        placeholder="Catégorie"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="date"
        name="published_at"
        value={formData.published_at}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />

      <textarea
        placeholder="Résumé"
        name="excerpt"
        value={formData.excerpt}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
        rows="2"
      />

      <div>
        <textarea
          placeholder="Contenu complet"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          className="w-full border p-3 rounded"
          required
        />
        {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content[0]}</p>}
      </div>

      <div className="mt-6">
        <label className="block font-semibold mb-2">Image de l'article</label>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleImageFile(e.dataTransfer.files[0]);
          }}
          onClick={() => document.getElementById("blog-image-input").click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            isDragging ? "border-yellow-500 bg-yellow-50" : "border-gray-300"
          }`}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Aperçu" className="mx-auto h-32 object-contain mb-2" />
          ) : (
            <p className="text-gray-500">Glissez-déposez une image ici, ou cliquez pour choisir un fichier</p>
          )}

          <input
            id="blog-image-input"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={(e) => handleImageFile(e.target.files[0])}
          />
        </div>
        {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image[0]}</p>}
      </div>

      {errors.general && <p className="text-red-600 mt-4 font-semibold">{errors.general[0]}</p>}

      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="mt-4 bg-yellow-500 px-6 py-3 rounded-lg font-bold disabled:opacity-50">
          {loading ? "Enregistrement..." : editingBlog ? "Modifier Article" : "Ajouter Article"}
        </button>

        {editingBlog && (
          <button type="button" onClick={onCancel} className="mt-4 bg-gray-500 text-white px-6 py-3 rounded-lg">
            Annuler
          </button>
        )}
      </div>

    </form>
  );
}

export default BlogForm;