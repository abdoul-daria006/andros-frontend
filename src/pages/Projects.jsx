import { useEffect, useState } from "react";
import api from "../api/axios";
import ProjectCard from "../components/ProjectCard/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("Tous");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/projects")
      .then((res) => setProjects(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const sectors = ["Tous", ...new Set(projects.map((p) => p.sector).filter(Boolean))];

  const filteredProjects =
    filter === "Tous" ? projects : projects.filter((p) => p.sector === filter);

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10">Nos Réalisations</h1>

        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setFilter(sector)}
              className={`px-5 py-3 rounded-lg ${filter === sector ? "bg-black text-white" : "bg-white"}`}
            >
              {sector}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center">Chargement...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;