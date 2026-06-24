import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const image = product.image_url || "/products/product1.jpeg";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img src={image} alt={product.name} className="w-full h-56 object-cover" />

      <div className="p-6">
        <p className="text-gray-500 text-sm">{product.category}</p>
        <h3 className="text-2xl font-bold mt-2">{product.name}</h3>
        <p className="mt-3 text-gray-600">{product.short_description || product.description}</p>

        <Link to={`/products/${product.id}`} className="inline-block mt-5 px-5 py-3 bg-black text-white rounded-lg">
          Voir le produit
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;