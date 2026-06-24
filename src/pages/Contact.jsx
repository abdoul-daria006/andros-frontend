function Contact() {
  return (
    <section
      className="
      min-h-screen
      bg-gray-50
      py-20
      px-6
      "
    >
      <div className="max-w-7xl mx-auto">

        <h1
          className="
          text-5xl
          font-bold
          text-center
          mb-4
          "
        >
          Contactez-nous
        </h1>

        <p
          className="
          text-center
          text-gray-600
          max-w-2xl
          mx-auto
          mb-16
          "
        >
          Notre équipe vous accompagne dans vos projets
          d'isolation acoustique et thermique.
          N'hésitez pas à nous contacter pour toute
          demande d'information ou de devis.
        </p>

        <div
          className="
          grid
          lg:grid-cols-2
          gap-12
          "
        >

          {/* INFOS */}

          <div
            className="
            bg-white
            p-10
            rounded-2xl
            shadow-lg
            "
          >
            <h2
              className="
              text-3xl
              font-bold
              mb-8
              "
            >
              Nos coordonnées
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-bold text-lg">
                  Adresse
                </h3>

                <p className="text-gray-600">
                  MOHAMMEDIA PARC PLAZA C
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Téléphone
                </h3>

                <a
                  href="tel:0618878816"
                  className="
                  block
                  text-yellow-600
                  font-semibold
                  "
                >
                  06 18 87 88 16
                </a>

                <a
                  href="tel:0665793125"
                  className="
                  block
                  text-yellow-600
                  font-semibold
                  "
                >
                  06 65 79 31 25
                </a>
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Email
                </h3>

                <a
                  href="mailto:meryemindustry@gmail.com"
                  className="
                  text-yellow-600
                  font-semibold
                  "
                >
                  meryemindustry@gmail.com
                </a>
              </div>

            </div>
          </div>

          {/* FORMULAIRE */}

          <div
            className="
            bg-white
            p-10
            rounded-2xl
            shadow-lg
            "
          >
            <h2
              className="
              text-3xl
              font-bold
              mb-8
              "
            >
              Envoyer un message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Nom complet"
                className="
                w-full
                border
                p-4
                rounded-lg
                "
              />

              <input
                type="email"
                placeholder="Adresse email"
                className="
                w-full
                border
                p-4
                rounded-lg
                "
              />

              <input
                type="tel"
                placeholder="Téléphone"
                className="
                w-full
                border
                p-4
                rounded-lg
                "
              />

              <textarea
                rows="6"
                placeholder="Votre message"
                className="
                w-full
                border
                p-4
                rounded-lg
                "
              />

              <button
                type="submit"
                className="
                bg-black
                text-white
                px-8
                py-4
                rounded-lg
                hover:opacity-90
                transition
                "
              >
                Envoyer
              </button>

            </form>
          </div>

        </div>

        {/* GOOGLE MAP */}

        <div className="mt-16">

          <h2
            className="
            text-3xl
            font-bold
            mb-8
            text-center
            "
          >
            Notre localisation
          </h2>

          <iframe
            title="MA Industry Location"
            src="https://maps.google.com/maps?q=Mohammedia&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="
            w-full
            h-[500px]
            rounded-2xl
            shadow-lg
            "
          />
        </div>

      </div>
    </section>
  );
}

export default Contact;