function FAQSection() {

  const faqs = [
    {
      question:
        "Les produits sont-ils certifiés ?",
      answer:
        "Oui, conformément aux normes européennes."
    },

    {
      question:
        "Quelle est la durée de vie moyenne ?",
      answer:
        "Plus de 25 ans selon les conditions d'utilisation."
    },

    {
      question:
        "Les solutions conviennent-elles à l'industrie ?",
      answer:
        "Oui, elles sont adaptées aux bâtiments industriels, tertiaires et résidentiels."
    }
  ];

  return (
    <section className="mt-20">

      <h2 className="text-4xl font-bold text-center mb-10">
        FAQ Technique
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">

        {faqs.map((faq, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h3 className="font-bold text-xl">
              {faq.question}
            </h3>

            <p className="mt-3 text-gray-600">
              {faq.answer}
            </p>
          </div>

        ))}

      </div>

    </section>
  );
}

export default FAQSection;