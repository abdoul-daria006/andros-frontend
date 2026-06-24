import { FaCheckCircle } from "react-icons/fa";

export default function Values() {
    const values = [
        "Technologie de pointe pour une isolation performante",
        "Produits certifiés conformes aux normes internationales",
        "Expertise et accompagnement dans vos projets",
        "Solutions sur mesure adaptées à vos besoins",
    ];

    return (
        <section className="py-24 bg-[#f5f5f5]">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-14">
                    Pourquoi choisir MA INDUSTRY ?
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-sm flex gap-4 items-start"
                        >
                            <FaCheckCircle
                                className="text-yellow-600 mt-1"
                                size={24}
                            />

                            <p className="text-lg">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}