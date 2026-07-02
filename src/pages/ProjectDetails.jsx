import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    api.get(`/projects/${id}`)
      .then((res) => {
        setProject(res.data.data);
        setCurrentImageIndex(0);
      })
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-20">Chargement...</div>;
  if (notFound || !project) return <div className="p-20">Projet introuvable</div>;

  const images = Array.isArray(project.images_urls)
    ? project.images_urls.filter(Boolean)
    : [];
  const displayImages = images.length > 0
    ? images
    : project.image_url
      ? [project.image_url]
      : ["/projects/placeholder.jpg"];

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="relative">
          <img
            src={displayImages[currentImageIndex]}
            alt={`${project.title} ${currentImageIndex + 1}`}
            className="w-full rounded-xl shadow-lg object-cover h-[420px]"
          />

          {displayImages.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-black"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-black"
              >
                ›
              </button>
            </>
          )}
        </div>

        <div>
          <span className="bg-gray-200 px-4 py-2 rounded-full">{project.sector}</span>
          <h1 className="text-5xl font-bold mt-5">{project.title}</h1>
          <p className="mt-2 text-gray-500">{project.location}</p>
          <p className="mt-6 text-lg text-gray-700">{project.description}</p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Détails du projet</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-bold">Client</h3>
            <p>{project.client || "Non renseigné"}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-bold">Date de réalisation</h3>
            <p>{project.completion_date || "Non renseignée"}</p>
          </div>
          <div className="bg-black text-white p-6 rounded-xl">
            <h3 className="font-bold">Performance</h3>
            <p>{project.performance || "-"}</p>
          </div>
        </div>
      </section>

      <section className="mt-20 bg-black text-white p-10 rounded-xl text-center">
        <h2 className="text-3xl font-bold">Un projet similaire en tête ?</h2>
        <p className="mt-3">Parlons-en avec nos experts.</p>
        <Link to="/quote" className="inline-block mt-6 bg-[#B8954A] text-black px-8 py-4 rounded-lg font-bold hover:bg-[#d6ba6b] transition">
          Demander un devis
        </Link>
      </section>
    </div>
  );
}

export default ProjectDetails;