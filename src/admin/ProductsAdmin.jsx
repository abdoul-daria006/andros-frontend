import { useEffect, useState } from "react";

import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";
import ProductForm from "../components/ProductForm/ProductForm";
import ProductTable from "../components/ProductTable/ProductTable";
import api from "../api/axios";

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProducts = () => {
    setLoading(true);
    api.get("/products")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSaved = () => {
    setEditingProduct(null);
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };


  const handleToggle = async (id) => {
  try {
    await api.patch(`/products/${id}/toggle`);
    loadProducts();
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
          <h2 className="text-4xl font-bold mb-10">Gestion Produits</h2>

          <ProductForm
            onSaved={handleSaved}
            editingProduct={editingProduct}
            onCancel={() => setEditingProduct(null)}
          />

          {loading ? (
            <p>Chargement...</p>
          ) : (
            <ProductTable
              products={products}
              onEdit={(p) => { setEditingProduct(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />

          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsAdmin;