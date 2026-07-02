import { useEffect, useState } from "react";
import api from "../../api/axios";

function ProjectForm({ onSaved, editingProject, onCancel }) {
  const emptyForm = {
    title: "",
    sector: "",
    location: "",
    client: "",
    completion_date: "",
    performance: "",
    description: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title || "",
        sector: editingProject.sector || "",
        location: editingProject.location || "",
        client: editingProject.client || "",
        completion_date: editingProject.completion_date || "",
        performance: editingProject.performance || "",
        description: editingProject.description || "",
      });
      setImagePreviews(
        editingProject.images_urls?.length > 0
          ? editingProject.images_urls
          : editingProject.image_url
            ? [editingProject.image_url]
            : []
      );
      setImageFiles([]);
    } else {
      setFormData(emptyForm);
      setImagePreviews([]);
      setImageFiles([]);
    }
  }, [editingProject]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageFiles = (files) => {
    if (!files || files.length === 0) return;
    const selectedFiles = Array.from(files);
    setImageFiles(selectedFiles);
    setImagePreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      // On n'envoie pas les champs optionnels vides (sinon Laravel rejette une date vide)
      if (value !== "" && value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => data.append("images[]", file));
    }

    try {
      if (editingProject) {
        data.append("_method", "PUT");
        await api.post(`/projects/${editingProject.id}`, data);
      } else {
        await api.post("/projects", data);
      }
      onSaved();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        console.error(err);
        setErrors({ general: [err.response?.data?.message || `Erreur ${err.response?.status || ""} : vérifiez la console`] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8">

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <input
            placeholder="Titre du projet"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title[0]}</p>}
        </div>

        <div>
          <input
            placeholder="Secteur"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />
          {errors.sector && <p className="text-red-600 text-sm mt-1">{errors.sector[0]}</p>}
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">

        <input
          placeholder="Ville / Localisation"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          placeholder="Client"
          name="client"
          value={formData.client}
          onChange={handleChange}
          className="border p-3 rounded"
        />

      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">

        <input
          type="date"
          name="completion_date"
          value={formData.completion_date}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          placeholder="Performance (ex: -45dB)"
          name="performance"
          value={formData.performance}
          onChange={handleChange}
          className="border p-3 rounded"
        />

      </div>

      <div>
        <textarea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded w-full mt-4"
          rows="4"
          required
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description[0]}</p>}
      </div>

      <div className="mt-6">
        <label className="block font-semibold mb-2">Image du projet</label>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleImageFiles(e.dataTransfer.files);
          }}
          onClick={() => document.getElementById("project-image-input").click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            isDragging ? "border-yellow-500 bg-yellow-50" : "border-gray-300"
          }`}
        >
          {imagePreviews.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 mx-auto max-w-md">
              {imagePreviews.map((preview, index) => (
                <img
                  key={`${preview}-${index}`}
                  src={preview}
                  alt={`Aperçu ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Glissez-déposez une ou plusieurs images ici, ou cliquez pour choisir des fichiers</p>
          )}

          <input
            id="project-image-input"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            multiple
            onChange={(e) => handleImageFiles(e.target.files)}
          />
        </div>
        {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image[0]}</p>}
      </div>

      {/* affichage d'erreur générique */}

      {errors.general && (
        <p className="text-red-600 mt-4 font-semibold">{errors.general[0]}</p>
      )}

      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="mt-4 bg-yellow-500 px-6 py-3 rounded-lg font-bold disabled:opacity-50">
          {loading ? "Enregistrement..." : editingProject ? "Mettre à jour" : "Ajouter Réalisation"}
        </button>

        {editingProject && (
          <button type="button" onClick={onCancel} className="mt-4 bg-gray-500 text-white px-6 py-3 rounded-lg">
            Annuler
          </button>
        )}
      </div>

    </form>
  );
}

export default ProjectForm;