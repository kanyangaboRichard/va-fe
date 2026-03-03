// src/layouts/AppLayout.tsx
import Sidebar from "./Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>

    </div>
  );
};

export default AppLayout;