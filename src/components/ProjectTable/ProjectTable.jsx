function ProjectTable({ projects, onDelete, onEdit, onToggle }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-4">Image</th>
            <th className="p-4">Projet</th>
            <th className="p-4">Ville</th>
            <th className="p-4">Secteur</th>
            <th className="p-4">Statut</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className={`border-b ${!project.is_active ? "opacity-50" : ""}`}>
              <td className="p-4">
                {project.image_url ? (
                  <img src={project.image_url} alt="" className="w-24 h-16 object-cover rounded" />
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="p-4">{project.title}</td>
              <td className="p-4">{project.location || "—"}</td>
              <td className="p-4">{project.sector}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  project.is_active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                }`}>
                  {project.is_active ? "Visible" : "Masqué"}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => onToggle(project.id)} className="bg-gray-700 text-white px-4 py-2 rounded">
                    {project.is_active ? "Masquer" : "Afficher"}
                  </button>
                  <button onClick={() => onEdit(project)} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Modifier
                  </button>
                  <button onClick={() => onDelete(project.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;