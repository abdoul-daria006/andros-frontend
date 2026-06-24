import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

function Quote() {
  const [searchParams] = useSearchParams();
  const selectedProduct = searchParams.get("product");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const product = e.target.product.value;
    const problemDescription = e.target.problem.value;

    const payload = {
      first_name: e.target.firstName.value,
      last_name: e.target.lastName.value,
      company: e.target.company.value,
      service: e.target.projectType.value,
      surface: e.target.surface.value || null,
      problem_description: product
        ? `Produit concerné : ${product}\n\n${problemDescription}`
        : problemDescription,
      email: e.target.email.value,
      phone: e.target.phone.value,
    };

    try {
      await api.post("/quote", payload);
      setSuccess(true);
      e.target.reset();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        console.error(err);
        setErrors({ general: ["Une erreur est survenue, réessayez."] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10">Demande de devis</h1>

        {success && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-center font-semibold">
            Votre demande a été envoyée avec succès ! Nous vous recontacterons rapidement.
          </div>
        )}

        {errors.general && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center font-semibold">
            {errors.general[0]}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-lg space-y-6">

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <input name="lastName" placeholder="Nom" className="border p-4 rounded-lg w-full" required />
              {errors.last_name && <p className="text-red-600 text-sm mt-1">{errors.last_name[0]}</p>}
            </div>

            <div>
              <input name="firstName" placeholder="Prénom" className="border p-4 rounded-lg w-full" required />
              {errors.first_name && <p className="text-red-600 text-sm mt-1">{errors.first_name[0]}</p>}
            </div>
          </div>

          <input name="company" placeholder="Société" className="w-full border p-4 rounded-lg" />

          <div>
            <select name="projectType" className="w-full border p-4 rounded-lg" required>
              <option value="">Type de projet</option>
              <option>Résidentiel</option>
              <option>Commercial</option>
              <option>Industriel</option>
              <option>Autre</option>
            </select>
            {errors.service && <p className="text-red-600 text-sm mt-1">{errors.service[0]}</p>}
          </div>

          <input
            name="surface"
            type="number"
            placeholder="Surface (m²)"
            className="w-full border p-4 rounded-lg"
          />

          <textarea
            name="problem"
            rows="5"
            placeholder="Décrivez votre besoin"
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="product"
            defaultValue={selectedProduct || ""}
            placeholder="Produit concerné"
            className="w-full border p-4 rounded-lg"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <input name="email" type="email" placeholder="Email" className="border p-4 rounded-lg w-full" required />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>}
            </div>

            <div>
              <input name="phone" placeholder="Téléphone" className="border p-4 rounded-lg w-full" required />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone[0]}</p>}
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 rounded-lg disabled:opacity-50">
            {loading ? "Envoi..." : "Envoyer la demande"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default Quote;