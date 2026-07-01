import { useEffect, useState } from "react";
import api from "../../api/axios";

function ProductForm({ onSaved, editingProduct, onCancel }) {
  const emptyForm = {
    category: "",
    name: "",
    reference: "",
    short_description: "",
    description: "",
    composition: "",
    materials: "",
    thickness: "",
    acoustic: "",
    thermal: "",
    is_featured: false,
  };

  const [formData, setFormData] = useState(emptyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [sheetFile, setSheetFile] = useState(null);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isDraggingSheet, setIsDraggingSheet] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        category: editingProduct.category || "",
        name: editingProduct.name || "",
        reference: editingProduct.reference || "",
        short_description: editingProduct.short_description || "",
        description: editingProduct.description || "",
        composition: editingProduct.composition || "",
        materials: editingProduct.materials || "",
        thickness: editingProduct.thickness || "",
        acoustic: editingProduct.acoustic || "",
        thermal: editingProduct.thermal || "",
        is_featured: !!editingProduct.is_featured,
      });
      setImagePreviews(
        editingProduct.images_urls?.length > 0
          ? editingProduct.images_urls
          : editingProduct.image_url
            ? [editingProduct.image_url]
            : []
      );
      setImageFiles([]);
      setSheetFile(null);
    } else {
      setFormData(emptyForm);
      setImagePreviews([]);
      setImageFiles([]);
      setSheetFile(null);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageFiles = (files) => {
    if (!files || files.length === 0) return;
    const selectedFiles = Array.from(files);
    setImageFiles(selectedFiles);
    setImagePreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSheetFile = (file) => {
    if (!file) return;
    setSheetFile(file);
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setImageFiles([]);
    setImagePreviews([]);
    setSheetFile(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "is_featured") {
        data.append(key, value ? "1" : "0");
      } else if (value !== "" && value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => data.append("images[]", file));
    }
    if (sheetFile) data.append("fiche_produit", sheetFile);

    try {
      if (editingProduct) {
        data.append("_method", "PUT");
        await api.post(`/products/${editingProduct.id}`, data);
      } else {
        await api.post("/products", data);
      }
      resetForm();
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
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow mb-10">

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <input
            type="text"
            name="name"
            placeholder="Nom produit"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            required
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name[0]}</p>}
        </div>

        <input
          type="text"
          name="reference"
          placeholder="Référence"
          value={formData.reference}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <div>
          <input
            type="text"
            name="category"
            placeholder="Catégorie (ex: Isolation acoustique)"
            value={formData.category}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            required
          />
          {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category[0]}</p>}
        </div>

        <input
          type="text"
          name="thickness"
          placeholder="Épaisseur"
          value={formData.thickness}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="acoustic"
          placeholder="Performance acoustique"
          value={formData.acoustic}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="thermal"
          placeholder="Performance thermique"
          value={formData.thermal}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

      </div>

      <textarea
        name="short_description"
        placeholder="Description courte"
        value={formData.short_description}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full mt-4"
        rows="2"
      />

      <div>
        <textarea
          name="description"
          placeholder="Description complète"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
          rows="4"
          required
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description[0]}</p>}
      </div>

      <textarea
        name="composition"
        placeholder="Composition"
        value={formData.composition}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full mt-4"
        rows="3"
      />

      <textarea
        name="materials"
        placeholder="Matériaux"
        value={formData.materials}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full mt-4"
        rows="3"
      />

      <div className="mt-6">
        <label className="block font-semibold mb-2">Image du produit</label>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDraggingImage(true); }}
          onDragLeave={() => setIsDraggingImage(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDraggingImage(false);
            handleImageFiles(e.dataTransfer.files);
          }}
          onClick={() => document.getElementById("image-input").click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            isDraggingImage ? "border-yellow-500 bg-yellow-50" : "border-gray-300"
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
            <p className="text-gray-500">Glissez-déposez des images ici, ou cliquez pour choisir des fichiers</p>
          )}

          <input
            id="image-input"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            multiple
            onChange={(e) => handleImageFiles(e.target.files)}
          />
        </div>
        {errors.images && <p className="text-red-600 text-sm mt-1">{errors.images[0]}</p>}
      </div>

      <div className="mt-6">
        <label className="block font-semibold mb-2">Fiche produit (PDF)</label>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDraggingSheet(true); }}
          onDragLeave={() => setIsDraggingSheet(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDraggingSheet(false);
            handleSheetFile(e.dataTransfer.files[0]);
          }}
          onClick={() => document.getElementById("sheet-input").click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
            isDraggingSheet ? "border-yellow-500 bg-yellow-50" : "border-gray-300"
          }`}
        >
          {sheetFile ? (
            <p className="text-green-700 font-semibold">{sheetFile.name}</p>
          ) : editingProduct?.technical_sheet_url ? (
            <p className="text-gray-600">Fiche actuelle disponible — déposez un fichier pour la remplacer</p>
          ) : (
            <p className="text-gray-500">Glissez-déposez un PDF ici, ou cliquez pour choisir un fichier</p>
          )}

          <input
            id="sheet-input"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => handleSheetFile(e.target.files[0])}
          />
        </div>
        {errors.fiche_produit && <p className="text-red-600 text-sm mt-1">{errors.fiche_produit[0]}</p>}
      </div>

      <label className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          name="is_featured"
          checked={formData.is_featured}
          onChange={handleChange}
        />
        Produit mis en avant
      </label>

      {errors.general && <p className="text-red-600 mt-4 font-semibold">{errors.general[0]}</p>}

      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="mt-6 bg-yellow-500 px-6 py-3 rounded-lg font-bold disabled:opacity-50">
          {loading ? "Enregistrement..." : editingProduct ? "Mettre à jour" : "Ajouter Produit"}
        </button>

        {editingProduct && (
          <button type="button" onClick={onCancel} className="mt-6 bg-gray-500 text-white px-6 py-3 rounded-lg">
            Annuler
          </button>
        )}
      </div>

    </form>
  );
}

export default ProductForm;