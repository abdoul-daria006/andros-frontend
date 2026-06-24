import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Building2,
  Newspaper,
  FileText,
} from "lucide-react";

import logo from "../../assets/logo.jpeg";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Produits", icon: Package },
  { to: "/admin/projects", label: "Réalisations", icon: Building2 },
  { to: "/admin/blog", label: "Blog", icon: Newspaper },
  { to: "/admin/quotes", label: "Devis", icon: FileText },
];

function AdminSidebar() {
  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6 flex flex-col">

      <div className="flex items-center gap-3 mb-12 pb-6 border-b border-[#27272A]">
        <img src={logo} alt="MA Industry" className="h-12 bg-white rounded-md p-1" />
      </div>

      <nav className="space-y-2 flex-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
                isActive
                  ? "bg-[#B8954A] text-black"
                  : "text-[#A1A1AA] hover:bg-[#1A1A1A] hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-[#27272A] text-xs text-[#71717A]">
        © 2026 MA INDUSTRY
      </div>

    </aside>
  );
}

export default AdminSidebar;