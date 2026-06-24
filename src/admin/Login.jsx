import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/logo.jpeg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/login", { email, password });

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminUser", JSON.stringify(res.data.user));

      navigate("/admin");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Email ou mot de passe incorrect");
      } else {
        setError("Une erreur est survenue, réessayez");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-6">

      {/* Halo métallique en fond */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#3F3F46]/40 to-transparent blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#B8954A]/20 to-transparent blur-3xl" />

      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/10"
      >
        <div className="flex justify-center mb-8">
          <img src={logo} alt="MA Industry" className="h-20" />
        </div>

        <h1 className="font-heading text-2xl font-bold text-center mb-2 text-black">
          Connexion Admin
        </h1>
        <p className="text-center text-[#71717A] text-sm mb-8">
          Accédez à votre espace de gestion
        </p>

        {error && (
          <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm font-medium">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#3F3F46] mb-2">Email</label>
          <input
            type="email"
            placeholder="admin@maindustry.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#E4E4E7] p-3.5 rounded-lg focus:outline-none focus:border-black transition"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#3F3F46] mb-2">Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#E4E4E7] p-3.5 rounded-lg focus:outline-none focus:border-black transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3.5 rounded-lg font-semibold hover:bg-[#1A1A1A] transition disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

export default Login;