import { useEffect, useState } from "react";
import { Package, Building2, Newspaper, FileText } from "lucide-react";

import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";
import api from "../api/axios";

const STATUS_STYLES = {
  new: { label: "Nouveau", className: "bg-red-100 text-red-700" },
  in_progress: { label: "En cours", className: "bg-amber-100 text-amber-700" },
  treated: { label: "Traité", className: "bg-emerald-100 text-emerald-700" },
};

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    projects: 0,
    blogs: 0,
    quotes: 0,
  });

  const [latestQuotes, setLatestQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [productsRes, projectsRes, blogsRes, quotesRes] = await Promise.all([
          api.get("/products"),
          api.get("/projects"),
          api.get("/blogs"),
          api.get("/quotes"),
        ]);

        const quotes = quotesRes.data.data;

        setStats({
          products: productsRes.data.data.length,
          projects: projectsRes.data.data.length,
          blogs: blogsRes.data.data.length,
          quotes: quotes.length,
        });

        setLatestQuotes(quotes.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const cards = [
    { label: "Produits", value: stats.products, icon: Package },
    { label: "Réalisations", value: stats.projects, icon: Building2 },
    { label: "Articles", value: stats.blogs, icon: Newspaper },
    { label: "Devis", value: stats.quotes, icon: FileText },
  ];

  return (
    <div className="flex bg-[#FAFAFA] min-h-screen">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-8">
          <h2 className="font-heading text-3xl font-bold mb-10 text-black">Tableau de bord</h2>

          {loading ? (
            <p className="text-[#71717A]">Chargement...</p>
          ) : (
            <>
              {/* STATS */}
              <div className="grid md:grid-cols-4 gap-6">
                {cards.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="bg-white border border-[#E4E4E7] p-6 rounded-xl flex items-center justify-between hover:border-[#B8954A]/40 transition"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-[#71717A] uppercase tracking-wide">
                        {label}
                      </h3>
                      <p className="font-heading text-4xl font-bold mt-2 text-black">{value}</p>
                    </div>

                    <div className="bg-black/5 p-3 rounded-lg">
                      <Icon size={24} className="text-[#B8954A]" />
                    </div>
                  </div>
                ))}
              </div>

              {/* DERNIERS DEVIS */}
              <div className="mt-14">
                <h3 className="font-heading text-2xl font-bold mb-6 text-black">Dernières demandes</h3>

                <div className="space-y-4">
                  {latestQuotes.length === 0 && (
                    <div className="bg-white border border-[#E4E4E7] p-6 rounded-xl text-[#71717A]">
                      Aucun devis reçu.
                    </div>
                  )}

                  {latestQuotes.map((quote) => {
                    const statusInfo = STATUS_STYLES[quote.status] || STATUS_STYLES.new;

                    return (
                      <div
                        key={quote.id}
                        className="bg-white border border-[#E4E4E7] p-6 rounded-xl flex justify-between items-start flex-wrap gap-4"
                      >
                        <div>
                          <h4 className="font-semibold text-black">
                            {quote.first_name} {quote.last_name}
                          </h4>
                          <p className="text-sm text-[#71717A] mt-1">{quote.company || "—"}</p>
                          <p className="text-sm text-[#71717A]">{quote.service}</p>
                        </div>

                        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusInfo.className}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;