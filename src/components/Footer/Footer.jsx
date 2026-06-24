import logo from "../../assets/logo.jpeg";

function Footer() {
  return (
    <footer className="bg-black text-white mt-20 border-t border-[#B8954A]/30">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        <div className="md:col-span-1">
          <img src={logo} alt="MA Industry" className="h-16 bg-white rounded-lg p-2" />

          <p className="mt-5 text-[#A1A1AA] text-sm leading-relaxed">
            Votre référence en solutions industrielles d'isolation
            acoustique et thermique au Maroc.
          </p>
        </div>

        <div>
          <h3 className="font-heading font-semibold mb-4 text-white">
            Navigation
          </h3>

          <ul className="space-y-2 text-[#A1A1AA] text-sm">
            <li><a href="/" className="hover:text-[#B8954A] transition">Accueil</a></li>
            <li><a href="/about" className="hover:text-[#B8954A] transition">À propos</a></li>
            <li><a href="/products" className="hover:text-[#B8954A] transition">Produits</a></li>
            <li><a href="/technical-solutions" className="hover:text-[#B8954A] transition">Solutions Techniques</a></li>
            <li><a href="/projects" className="hover:text-[#B8954A] transition">Réalisations</a></li>
            <li><a href="/blog" className="hover:text-[#B8954A] transition">Blog</a></li>
            <li><a href="/contact" className="hover:text-[#B8954A] transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold mb-4 text-white">
            Contact
          </h3>

          <ul className="space-y-2 text-[#A1A1AA] text-sm">
            <li>MOHAMMEDIA PARC PLAZA C, Maroc</li>
            <li>meryemindustry@gmail.com</li>
            <li>+212 618-878816</li>
            <li>+212 665-793125</li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold mb-4 text-white">
            Demande rapide
          </h3>

          <p className="text-[#A1A1AA] text-sm mb-4">
            Un projet en tête ? Obtenez un devis personnalisé.
          </p>

          <a
            href="/quote"
            className="inline-block bg-white text-black px-5 py-3 rounded-lg font-semibold text-sm hover:bg-[#B8954A] hover:text-white transition"
          >
            Demander un devis
          </a>
        </div>

      </div>

      <div className="border-t border-[#27272A] py-5 text-center text-[#71717A] text-sm">
        © 2026 MA INDUSTRY — Tous droits réservés
      </div>

    </footer>
  );
}

export default Footer;