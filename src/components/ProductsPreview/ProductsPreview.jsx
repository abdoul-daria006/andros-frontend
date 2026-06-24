export default function ProductsPreview() {

    const products = [
        "Isolation Sol",
        "Isolation Mur",
        "Isolation Plafond",
        "Solutions Sur Mesure",
    ];

    return (
        <section className="py-24 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-14">
                    Nos Gammes de Produits
                </h2>

                <div className="grid md:grid-cols-4 gap-8">

                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="border rounded-xl p-10 text-center hover:shadow-xl transition"
                        >
                            <h3 className="font-bold text-xl">
                                {product}
                            </h3>
                        </div>
                    ))}

                </div>
            </div>

        </section>
    );
}