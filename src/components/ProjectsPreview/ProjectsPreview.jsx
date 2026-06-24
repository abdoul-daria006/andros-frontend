import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function ProjectsPreview() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects")
      .then((res) => setProjects(res.data.data.slice(0, 3)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-24 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-14">Dernières Réalisations</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden block"
            >
              {project.image_url ? (
                <img src={project.image_url} alt={project.title} className="h-56 w-full object-cover" />
              ) : (
                <div className="h-56 bg-gray-300"></div>
              )}

              <div className="p-6">
                <h3 className="font-bold text-xl">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}