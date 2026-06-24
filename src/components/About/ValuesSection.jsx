function ValuesSection() {
  const values = [
    "Technologie de pointe",
    "Produits certifiés",
    "Expertise technique",
    "Accompagnement client",
    "Solutions sur mesure",
    "Innovation continue"
  ];

  return (
    <section className="bg-gray-100 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Nos Valeurs
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {values.map((value) => (
            <div
              key={value}
              className="
              bg-white
              p-8
              rounded-xl
              shadow-md
              text-center
              "
            >
              <h3 className="font-bold text-xl">
                {value}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default ValuesSection;