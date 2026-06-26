import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTASection() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="py-20 bg-black text-white"
        >

            <div className="max-w-7xl mx-auto px-6 text-center">

                <h2 className="text-4xl font-bold mb-6">
                    Besoin d'une solution acoustique sur mesure ?
                </h2>

                <p className="text-gray-300 mb-8">
                    Nos experts vous accompagnent dans vos projets
                    résidentiels, industriels et tertiaires.
                </p>

                <motion.div
                    whileHover={{
                        scale: 1.05
                    }}
                    whileTap={{
                        scale: 0.95
                    }}
                >

                    <Link
                        to="/quote"
                        className="inline-block bg-[#B8954A] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#d6ba6b] transition"
                    >
                        Demander un devis
                    </Link>

                </motion.div>

            </div>

        </motion.section>
    );
}