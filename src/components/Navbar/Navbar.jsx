import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import logo from "../../assets/logo.jpeg";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/about", label: "À propos" },
  { to: "/products", label: "Produits" },
  { to: "/technical-solutions", label: "Solutions Techniques" },
  { to: "/projects", label: "Réalisations" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E4E4E7]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <motion.img
            src={logo}
            alt="MA Industry"
            className="h-14"
            whileHover={{ scale: 1.05 }}
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden lg:flex gap-8 font-medium">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative pb-1 transition ${
                  isActive
                    ? "text-black font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#B8954A]"
                    : "text-[#52525B] hover:text-black"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/quote"
              className="bg-[#B8954A] text-black px-6 py-3 rounded-lg font-semibold border border-[#B8954A] hover:bg-[#d6ba6b] transition"
            >
              Demander un devis
            </Link>
          </motion.div>
        </div>

        {/* Bouton mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-black"
          aria-label="Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-[#E4E4E7] bg-white"
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-semibold"
                      : "text-[#52525B] hover:text-black"
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <Link
                to="/quote"
                onClick={() => setOpen(false)}
                className="mt-2 bg-[#B8954A] text-black text-center px-6 py-3 rounded-lg font-semibold border border-[#B8954A] hover:bg-[#d6ba6b] transition"
              >
                Demander un devis
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;