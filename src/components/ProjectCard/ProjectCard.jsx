import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
      <img
        src={project.image_url || "/projects/placeholder.jpg"}
        alt={project.title}
        className="h-60 w-full object-cover"
      />

      <div className="p-6">
        <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm">
          {project.sector}
        </span>

        <h3 className="text-2xl font-bold mt-4">{project.title}</h3>
        <p className="text-gray-500">{project.location}</p>

        <Link to={`/projects/${project.id}`} className="inline-block mt-5 text-yellow-600 font-bold">
          Voir le projet →
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;