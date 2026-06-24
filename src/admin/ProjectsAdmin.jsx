import { useEffect, useState } from "react";

import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";
import ProjectForm from "../components/ProjectForm/ProjectForm";
import ProjectTable from "../components/ProjectTable/ProjectTable";
import api from "../api/axios";

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProjects = () => {
    setLoading(true);
    api.get("/projects")
      .then((res) => setProjects(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSaved = () => {
    setEditingProject(null);
    loadProjects();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce projet ?")) return;
    try {
      await api.delete(`/projects/${id}`);
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      await api.patch(`/projects/${id}/toggle`);
      loadProjects();
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
          <h2 className="text-4xl font-bold mb-10">Gestion Réalisations</h2>

          <ProjectForm
            onSaved={handleSaved}
            editingProject={editingProject}
            onCancel={() => setEditingProject(null)}
          />

          {loading ? (
            <p>Chargement...</p>
          ) : (
            <ProjectTable
              projects={projects}
              onEdit={(p) => { setEditingProject(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectsAdmin;