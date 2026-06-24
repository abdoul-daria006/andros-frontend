import { motion } from "framer-motion";

export default function Stats() {
    const stats = [
        { value: "35+", label: "Années d'expérience" },
        { value: "500+", label: "Projets réalisés" },
        { value: "100%", label: "Produits certifiés" },
        { value: "24/7", label: "Accompagnement" },
    ];

    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h3 className="text-5xl font-bold text-[#1A1A1A]">
                                {stat.value}
                            </h3>

                            <p className="text-gray-500 mt-3">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}