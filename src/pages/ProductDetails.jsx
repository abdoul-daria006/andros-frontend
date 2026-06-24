import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-20">Chargement...</div>;
  if (notFound || !product) return <div className="p-20">Produit introuvable</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        <img
          src={product.image_url || "/products/product1.jpeg"}
          alt={product.name}
          className="w-full rounded-xl shadow-lg"
        />

        <div>
          <span className="bg-gray-200 px-4 py-2 rounded-full">{product.category}</span>
          <h1 className="text-5xl font-bold mt-5">{product.name}</h1>
          <p className="mt-2 text-gray-500">Référence : {product.reference || "—"}</p>
          <p className="mt-6 text-lg text-gray-700">{product.description}</p>

          {product.technical_sheet_url && (
            <a
              href={product.technical_sheet_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-6 bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition"
            >
              📄 Télécharger la fiche technique
            </a>
          )}
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Informations techniques</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-bold">Composition</h3>
            <p>{product.composition || "Non renseigné"}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-bold">Matériaux</h3>
            <p>{product.materials || "Non renseigné"}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-bold">Épaisseur</h3>
            <p>{product.thickness || "Non renseignée"}</p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Performances</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black text-white p-8 rounded-xl">
            <div className="text-4xl font-bold">{product.acoustic || "-"}</div>
            <div>Isolation acoustique</div>
          </div>
          <div className="bg-black text-white p-8 rounded-xl">
            <div className="text-4xl font-bold">{product.thermal || "-"}</div>
            <div>Résistance thermique</div>
          </div>
        </div>
      </section>

      <section className="mt-20 bg-black text-white p-10 rounded-xl text-center">
        <h2 className="text-3xl font-bold">Besoin d'un devis ?</h2>
        <p className="mt-3">Nos experts vous accompagnent.</p>
        <Link to={`/quote?product=${product.name}`} className="inline-block mt-6 bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold">
          Demander un devis
        </Link>
      </section>
    </div>
  );
}

export default ProductDetails;