import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Building2,
  ClipboardList,
  LogOut,
  LayoutDashboard,
  ListTodo,
  Settings,
  FileDown,
  CircleArrowOutDownRight,
  User2Icon,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { useAuthStore } from "../../src/feature/store/authStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const role = user?.role;

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-100 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 text-xl font-bold text-indigo-200 border-b border-slate-800 flex items-center gap-2">
        <ShieldAlert className="h-6 w-6" />
        VA Platform
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">

        {/* Dashboard (all roles) */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-sm
            ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`
          }
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </NavLink>

        {/* Assessments (all roles) */}
        <NavLink
          to="/AssessmentPage"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-sm
            ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`
          }
        >
          <ClipboardList className="h-5 w-5" />
          Assessments
        </NavLink>

        {/* Companies (ADMIN + AUDITOR) */}
        {(role === "ADMIN" || role === "SUPER_ADMIN" || role === "AUDITOR") && (
          <NavLink
            to="/CompanyPage"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm
              ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`
            }
          >
            <Building2 className="h-5 w-5" />
            Companies
          </NavLink>
        )}

        {/* Checklists (ADMIN ONLY) */}
        {(role === "ADMIN" || role === "SUPER_ADMIN") && (
          <NavLink
            to="/Checklists"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm
              ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`
            }
          >
            <ListTodo className="h-5 w-5" />
            Checklists
          </NavLink>
        )}

        {/* Users (ADMIN ONLY) */}
        {(role === "ADMIN" || role === "SUPER_ADMIN") && (
          <NavLink
            to="/Users"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm
              ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`
            }
          >
            <User2Icon className="h-5 w-5" />
            User Management
          </NavLink>
        )}

        {/* External Findings (ADMIN + AUDITOR) */}
        {(role === "ADMIN" || role === "SUPER_ADMIN" || role === "AUDITOR") && (
          <NavLink
            to="/findings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm
              ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`
            }
          >
            <CircleArrowOutDownRight className="h-5 w-5" />
            External Findings
          </NavLink>
        )}

        {/* Reports (all roles) */}
        <NavLink
          to="/ReportsPage"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-sm
            ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`
          }
        >
          <FileDown className="h-5 w-5" />
          Reports
        </NavLink>

        {/* Audit Trails (ADMIN ONLY) */}
        {(role === "ADMIN" || role === "SUPER_ADMIN") && (
          <NavLink
            to="/AuditTrailsPage"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm
              ${isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`
            }
          >
            <Settings className="h-5 w-5" />
            Audit Trails
          </NavLink>
        )}

      </nav>

      {/* Profile Section */}
      {user && (
        <div className="border-t border-slate-800 p-4">

          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 w-full text-left hover:bg-slate-800 rounded-md p-2"
          >
            <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold">
              {user.name?.[0] || "U"}
            </div>

            <div className="flex-1 text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-slate-400">{user.role}</p>
            </div>

            {profileOpen ? (
              <ChevronUp className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {profileOpen && (
            <div className="mt-3 pl-12">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}

        </div>
      )}

    </aside>
  );
};

export default Sidebar;