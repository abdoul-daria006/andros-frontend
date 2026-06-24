import FAQSection from "../components/Technical/FAQSection";

function TechnicalSolutions() {
  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <h1 className="text-5xl font-bold text-center mb-6">
          Solutions Techniques
        </h1>

        <p className="text-center text-gray-600 max-w-3xl mx-auto">
          MA Industry propose des solutions conformes
          aux normes marocaines et européennes
          pour l'isolation acoustique et thermique.
        </p>

        {/* NORMES */}

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white p-8 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
              Normes Marocaines
            </h2>

            <p>
              Respect des exigences réglementaires
              applicables au marché marocain.
            </p>

          </div>

          <div className="bg-white p-8 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
              Normes Européennes
            </h2>

            <p>
              Produits conformes aux standards
              européens de qualité et de sécurité.
            </p>

          </div>

          <div className="bg-white p-8 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
              Certifications
            </h2>

            <p>
              Produits testés et certifiés
              selon les standards internationaux.
            </p>

          </div>

        </div>

        {/* DOCUMENTATION */}

        <section className="mt-20">

          <h2 className="text-4xl font-bold text-center mb-10">
            Documentation Technique
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {/* PDF 1 */}

            <div className="bg-white p-8 rounded-xl shadow">

              <h3 className="text-xl font-bold">
                Guide Technique
              </h3>

              <p className="mt-3 text-gray-600">
                Documentation complète sur les
                performances acoustiques et
                thermiques.
              </p>

              <a
                href="/technical-guide.pdf"
                download
                className="
                inline-block
                mt-6
                bg-black
                text-white
                px-5
                py-3
                rounded-lg
                "
              >
                Télécharger PDF
              </a>

            </div>

            {/* PDF 2 */}

            <div className="bg-white p-8 rounded-xl shadow">

              <h3 className="text-xl font-bold">
                Guide d'Installation
              </h3>

              <p className="mt-3 text-gray-600">
                Instructions de pose et bonnes
                pratiques de mise en œuvre.
              </p>

              <a
                href="/installation-guide.pdf"
                download
                className="
                inline-block
                mt-6
                bg-black
                text-white
                px-5
                py-3
                rounded-lg
                "
              >
                Télécharger PDF
              </a>

            </div>

            {/* PDF 3 */}

            <div className="bg-white p-8 rounded-xl shadow">

              <h3 className="text-xl font-bold">
                Certifications
              </h3>

              <p className="mt-3 text-gray-600">
                Documents de conformité et
                certifications produits.
              </p>

              <button
                className="
                mt-6
                bg-gray-300
                text-black
                px-5
                py-3
                rounded-lg
                "
              >
                Bientôt disponible
              </button>

            </div>

          </div>

        </section>

        {/* FAQ */}

        <FAQSection />

      </div>

    </section>
  );
}

export default TechnicalSolutions;