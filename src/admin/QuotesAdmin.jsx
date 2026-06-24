import { useEffect, useState } from "react";

import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";
import api from "../api/axios";

const STATUS_LABELS = {
  new: { label: "Nouveau", color: "bg-red-500" },
  in_progress: { label: "En cours", color: "bg-yellow-500" },
  treated: { label: "Traité", color: "bg-green-600" },
};

function QuotesAdmin() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadQuotes = () => {
    setLoading(true);
    api.get("/quotes")
      .then((res) => setQuotes(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  const deleteQuote = async (id) => {
    if (!window.confirm("Supprimer cette demande ?")) return;
    try {
      await api.delete(`/quotes/${id}`);
      loadQuotes();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/quotes/${id}`, { status });
      loadQuotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">Gestion des Devis</h1>

          {loading ? (
            <p>Chargement...</p>
          ) : quotes.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow text-center">Aucun devis reçu.</div>
          ) : (
            <div className="space-y-6">
              {quotes.map((quote) => {
                const statusInfo = STATUS_LABELS[quote.status] || STATUS_LABELS.new;

                return (
                  <div key={quote.id} className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold">
                      {quote.first_name} {quote.last_name}
                    </h2>

                    <p className="mt-2">Société : {quote.company || "—"}</p>
                    <p>Type de projet : {quote.service}</p>
                    <p>Surface : {quote.surface ? `${quote.surface} m²` : "—"}</p>
                    <p>Email : {quote.email}</p>
                    <p>Téléphone : {quote.phone}</p>
                    <p className="mt-3 whitespace-pre-line">Besoin : {quote.problem_description || "—"}</p>

                    <div className="mt-4">
                      <span className="font-bold">Statut : </span>
                      <span className={`ml-2 px-3 py-1 rounded-full text-white ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>

                    <div className="flex gap-3 mt-6 flex-wrap">
                      <button
                        onClick={() => updateStatus(quote.id, "in_progress")}
                        className="bg-yellow-500 px-4 py-2 rounded-lg font-semibold"
                      >
                        En cours
                      </button>

                      <button
                        onClick={() => updateStatus(quote.id, "treated")}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        Traité
                      </button>

                      <button
                        onClick={() => deleteQuote(quote.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuotesAdmin;