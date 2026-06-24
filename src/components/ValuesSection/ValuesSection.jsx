import { motion } from "framer-motion";
import { FaShieldAlt, FaTools, FaCogs } from "react-icons/fa";

export default function ValuesSection() {

    const values = [
        {
            icon: <FaShieldAlt size={40} />,
            title: "Technologie de pointe",
            description:
                "Produits certifiés conformes aux normes internationales."
        },
        {
            icon: <FaTools size={40} />,
            title: "Expertise & Accompagnement",
            description:
                "35 ans d'expérience dans les solutions acoustiques."
        },
        {
            icon: <FaCogs size={40} />,
            title: "Solutions sur mesure",
            description:
                "Adaptées aux besoins spécifiques de chaque projet."
        }
    ];

    return (
        <section className="py-20 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-14">
                    Pourquoi choisir MA INDUSTRY ?
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    {values.map((value, index) => (

                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 40
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}
                            viewport={{
                                once: true
                            }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2
                            }}
                            className="border border-gray-200 p-8 rounded-xl text-center shadow-sm hover:shadow-xl transition"
                        >

                            <div className="flex justify-center mb-4">
                                {value.icon}
                            </div>

                            <h3 className="text-xl font-semibold mb-3">
                                {value.title}
                            </h3>

                            <p className="text-gray-600">
                                {value.description}
                            </p>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
}