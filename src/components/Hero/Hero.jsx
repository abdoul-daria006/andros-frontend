import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function LayeredPanelsBackground() {
  const panels = [
    { width: "75%", top: "8%", left: "5%", rotate: -3, delay: 0, color: "from-[#D4D4D8] to-[#A1A1AA]" },
    { width: "65%", top: "22%", left: "20%", rotate: 2, delay: 0.15, color: "from-[#E4E4E7] to-[#B8954A]/40" },
    { width: "80%", top: "40%", left: "2%", rotate: -1.5, delay: 0.3, color: "from-[#27272A] to-[#3F3F46]" },
    { width: "60%", top: "58%", left: "25%", rotate: 3, delay: 0.45, color: "from-[#D4D4D8] to-[#71717A]" },
    { width: "70%", top: "74%", left: "8%", rotate: -2, delay: 0.6, color: "from-[#B8954A]/50 to-[#D4B886]/30" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {panels.map((panel, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -120, rotate: panel.rotate - 8 }}
          animate={{
            opacity: 1,
            x: 0,
            rotate: panel.rotate,
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: panel.delay },
            x: { duration: 0.8, delay: panel.delay, ease: "easeOut" },
            y: {
              duration: 4 + i * 0.4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: panel.delay + 0.8,
            },
          }}
          className={`absolute h-16 md:h-20 rounded-xl bg-gradient-to-r ${panel.color} shadow-xl border border-white/40 backdrop-blur-sm`}
          style={{
            width: panel.width,
            top: panel.top,
            left: panel.left,
          }}
        />
      ))}

      {/* voile clair pour garder le texte lisible */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-white min-h-[85vh] flex items-center overflow-hidden">

      <LayeredPanelsBackground />

      <div className="relative max-w-7xl mx-auto px-6 py-20 z-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <span className="inline-flex items-center gap-2 uppercase tracking-widest text-sm text-[#52525B]">
              <span className="w-8 h-px bg-[#B8954A]" />
              Représentant exclusif ANDROS / PANISOL
            </span>

            <h1 className="font-heading text-5xl md:text-7xl font-bold text-black mt-5 leading-tight">
              MA INDUSTRY
            </h1>

            <p className="mt-6 text-lg text-[#52525B] leading-relaxed max-w-lg">
              Solutions professionnelles d'isolation acoustique
              et thermique pour les secteurs résidentiel,
              industriel, tertiaire et hôtelier.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/quote"
                className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1A1A1A] transition"
              >
                Demander un devis
              </Link>

              <Link
                to="/products"
                className="border border-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition"
              >
                Découvrir nos produits
              </Link>

            </div>

          </motion.div>

          {/* Bloc visuel métallique */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >

            <div className="relative w-full max-w-lg">

              <div className="bg-gradient-to-br from-[#E4E4E7] via-[#F4F4F5] to-[#D4D4D8] rounded-3xl shadow-2xl p-10 border border-white/60">

                <div className="bg-white/70 backdrop-blur rounded-2xl p-10 text-center border border-[#E4E4E7]">

                  <h3 className="font-heading text-5xl font-extrabold text-black">
                    35 Ans
                  </h3>

                  <p className="mt-3 text-[#52525B]">
                    d'expertise dans l'isolation acoustique et thermique
                  </p>

                  <div className="mt-6 h-px w-16 mx-auto bg-[#B8954A]" />

                  <p className="mt-6 text-sm uppercase tracking-wider text-[#71717A]">
                    Résidentiel · Industriel · Tertiaire · Hôtelier
                  </p>

                </div>

              </div>

              {/* Badge flottant */}
              <div className="absolute -bottom-6 -left-6 bg-black text-white px-6 py-4 rounded-xl shadow-xl">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-[#A1A1AA]">Conformité normes</p>
              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}