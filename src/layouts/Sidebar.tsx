import { NavLink, useNavigate } from "react-router-dom";
import { Building2, Factory, LogOut, User } from "lucide-react";
import { useAuthStore } from "../../src/feature/store/authStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 text-xl font-bold text-indigo-200">
        Vulnerability Platform
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <NavLink
          to="/companyPage"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-sm
             ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`
          }
        >
          <Building2 className="h-5 w-5" />
          Companies
        </NavLink>

        <NavLink
          to="/facilities"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-sm
             ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`
          }
        >
          <Factory className="h-5 w-5" />
          Facilities
        </NavLink>
      </nav>

      {/* User / Logout */}
      {user && (
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold">
              {user.name?.[0] || "U"}
            </div>

            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-slate-400">{user.role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
