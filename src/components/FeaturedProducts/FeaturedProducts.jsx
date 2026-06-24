import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "PANISOL PHONIC",
    description: "Isolation acoustique des sols.",
  },
  {
    id: 2,
    name: "ANDROS WALL",
    description: "Isolation des cloisons et parois.",
  },
  {
    id: 3,
    name: "ANDROS CEILING",
    description: "Solutions acoustiques pour plafonds.",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Nos Gammes de Produits
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold mb-4">
                {product.name}
              </h3>

              <p className="text-gray-600 mb-6">
                {product.description}
              </p>

              <Link
                to="/products"
                className="font-semibold"
              >
                Découvrir →
              </Link>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}