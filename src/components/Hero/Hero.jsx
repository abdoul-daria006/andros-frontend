import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Remplace ces chemins par tes vrais noms de fichiers dans /public
const slides = [
  "/Plaza0.jpg",
  "/Plaza1.jpg",
  "/Plaza2.jfif",
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current]}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Indicateurs */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-8 bg-[#B8954A]" : "w-4 bg-white/40"
            }`}
            aria-label={`Diapositive ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-black min-h-[90vh] flex items-end overflow-hidden">

      <HeroCarousel />

      {/* Texte en haut, par-dessus le carrousel */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-32 md:pt-40 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 uppercase tracking-widest text-sm text-white/70">
            <span className="w-8 h-px bg-[#B8954A]" />
            Représentant exclusif ANDROS / PANISOL
          </span>

          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Solutions d'isolation acoustique & thermique
          </h1>

          <p className="mt-4 text-white/80 text-lg max-w-lg">
            Pour les secteurs résidentiel, industriel, tertiaire et hôtelier.
          </p>

          <Link
            to="/quote"
            className="inline-block mt-6 bg-[#B8954A] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#d6ba6b] transition pointer-events-auto"
          >
            Demander un devis
          </Link>
        </motion.div>
      </div>

      <div className="relative z-10 w-full h-32 md:h-40" />

    </section>
  );
}