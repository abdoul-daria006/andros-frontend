import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import api from "../../api/axios";

function AdminHeader() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      navigate("/admin/login");
    }
  };

  return (
    <header className="bg-white border-b border-[#E4E4E7] px-8 py-5 flex justify-between items-center">
      <h1 className="font-heading text-2xl font-bold text-black">Administration</h1>

      <button
        onClick={logout}
        className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1A1A1A] transition"
      >
        <LogOut size={18} />
        Déconnexion
      </button>
    </header>
  );
}

export default AdminHeader;