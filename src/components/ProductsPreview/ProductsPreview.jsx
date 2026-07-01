import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ProductsPreview() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/products")
            .then((res) => setProducts(res.data.data || []))
            .catch((err) => {
                console.error("Impossible de charger les produits :", err);
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="py-24 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-14">
                    Nos Gammes de Produits
                </h2>

                {loading ? (
                    <div className="grid md:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="border rounded-xl p-10 animate-pulse bg-gray-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-4 gap-8">
                        {products.length === 0 ? (
                            <div className="col-span-4 text-center text-gray-500">
                                Aucun produit disponible pour le moment.
                            </div>
                        ) : (
                            products.slice(0, 4).map((product) => (
                                <div
                                    key={product.id}
                                    className="border rounded-xl p-10 text-center hover:shadow-xl transition"
                                >
                                    <h3 className="font-bold text-xl mb-3">{product.name}</h3>
                                    <p className="text-gray-600">{product.category || "Sans catégorie"}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

        </section>
    );
}