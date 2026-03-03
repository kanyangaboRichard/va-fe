import { useState } from "react";
import apiClient from "../../api/Axios";
import ControlRow from "./ControlRow";
import AddDomainModal from "./AddDomainModal";
import { Pencil,Trash2,ChevronDown,ChevronRight,} from "lucide-react";




export default function DomainRow({domain,checklistId,index,onChanged,}: {domain: any;checklistId: string;index?: number; onChanged: () => void;}) {
  const [open, setOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  //  DELETE DOMAIN
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Delete domain "${domain.name}"? This will also delete its controls.`
    );

    if (!confirmDelete) return;

    try {
      setLoadingDelete(true);

      await apiClient.delete(
        `/checklists/${checklistId}/domains/${domain.id}`
      );

      onChanged();
    } catch (err: any) {
      console.error("Delete error:", err?.response?.data || err);
    } finally {
      setLoadingDelete(false);
    }
  };

  //  UPDATE DOMAIN
  const handleUpdate = async (data: {
    name: string;
    description?: string;
  }) => {
    try {
      await apiClient.put(
        `/checklists/${checklistId}/domains/${domain.id}`,
        {
          name: data.name,
          description: data.description || "",
        }
      );

      setShowEditModal(false);
      onChanged();
    } catch (err: any) {
      console.error("Update error:", err?.response?.data || err);
    }
  };

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">

        {/* HEADER */}
        <div className="px-6 py-4 flex items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setOpen(!open)}
              className="text-slate-500 hover:text-slate-700 transition"
            >
              {open ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>

            <div>
              <div className="font-semibold text-slate-800">
                {index !== undefined && (
                  <span className="text-slate-400 mr-2">
                    Domain {index + 1}
                  </span>
                )}
                {domain.name}
              </div>

              <div className="text-sm text-slate-500">
                {domain.description || "No description"}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-6">

            <div className="text-sm text-slate-500">
              Controls:{" "}
              <span className="font-medium text-slate-700">
                {domain.controls?.length || 0}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-400">

              {/* EDIT */}
              <button
                onClick={() => setShowEditModal(true)}
                className="hover:text-indigo-600 transition"
              >
                <Pencil size={16} />
              </button>

              {/* DELETE */}
              <button
                onClick={handleDelete}
                disabled={loadingDelete}
                className="hover:text-red-600 transition disabled:opacity-40"
              >
                <Trash2 size={16} />
              </button>

            </div>

          </div>
        </div>

        {/* BODY (COLLAPSIBLE) */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            open ? "max-h-[2000px]" : "max-h-0"
          }`}
        >
          <div className="border-t border-slate-200 px-6 py-4">

            {/* Controls Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-slate-500">
                Controls are optional.
              </p>

              <button className="text-indigo-600 text-sm font-medium hover:underline">
                + Add Control
              </button>
            </div>

            {/* Controls List */}
            {domain.controls?.length ? (
              <div className="space-y-3">
                {domain.controls.map((c: any) => (
                  <ControlRow key={c.id} control={c} />
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                No controls yet.
              </div>
            )}

          </div>
        </div>
      </div>

      {/*  EDIT MODAL */}
      <AddDomainModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
      />
    </>
  );
}