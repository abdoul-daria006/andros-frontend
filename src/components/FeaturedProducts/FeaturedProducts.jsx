import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data.data || []))
      .catch((err) => {
        console.error("Impossible de charger les produits mis en avant :", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const visibleProducts = products.filter((product) => product.is_active).slice(0, 3);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Nos Gammes de Produits
        </h2>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="border rounded-xl p-6 shadow-sm bg-gray-100 animate-pulse h-56" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {visibleProducts.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500">
                Aucun produit disponible pour le moment.
              </div>
            ) : (
              visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
                >
                  <h3 className="text-2xl font-bold mb-4">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mb-6">
                    {product.short_description || product.description || "Description non disponible"}
                  </p>

                  <Link to={`/products/${product.id}`} className="font-semibold">
                    Découvrir →
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}