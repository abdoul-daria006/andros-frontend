function PartnersSection() {
  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-10">
          Représentation Exclusive
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="border p-8 rounded-xl">
            <h3 className="text-2xl font-bold">
              ANDROS
            </h3>

            <p className="mt-4">
              Solutions acoustiques professionnelles.
            </p>
          </div>

          <div className="border p-8 rounded-xl">
            <h3 className="text-2xl font-bold">
              PANISOL
            </h3>

            <p className="mt-4">
              Isolation thermique et acoustique.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default PartnersSection;