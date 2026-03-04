import { useState } from "react";
import apiClient from "../../api/Axios";
import ControlRow from "./ControlRow";
import AddDomainModal from "./AddDomainModal";
import AddControlModal from "./AddControlModal";
import {Pencil,Trash2,ChevronDown,ChevronRight,} from "lucide-react";

type Props = {
  domain: any;
  checklistId: string;
  index?: number;
  onChanged: () => void;
};

export default function DomainRow({
  domain,
  checklistId,
  index,
  onChanged,
}: Props) {
  const [open, setOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [showAddControlModal, setShowAddControlModal] = useState(false);

  // DELETE DOMAIN
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
      alert(err?.response?.data?.message || "Failed to delete domain.");
    } finally {
      setLoadingDelete(false);
    }
  };

  // UPDATE DOMAIN
  const handleUpdate = async (data: {
    name: string;
    description?: string;
  }) => {
    await apiClient.put(
      `/checklists/${checklistId}/domains/${domain.id}`,
      {
        name: data.name,
        description: data.description || "",
      }
    );

    setShowEditModal(false);
    onChanged();
  };

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
        {/* HEADER */}
        <div className="px-6 py-4 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="text-slate-500 hover:text-slate-700 transition"
              type="button"
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

          {/* RIGHT */}
          <div className="flex items-center gap-6">
            <div className="text-sm text-slate-500">
              Controls:{" "}
              <span className="font-medium text-slate-700">
                {domain.controls?.length || 0}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <button
                onClick={() => setShowEditModal(true)}
                className="hover:text-indigo-600 transition"
                type="button"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={handleDelete}
                disabled={loadingDelete}
                className="hover:text-red-600 transition disabled:opacity-40"
                type="button"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            open ? "max-h-[2000px]" : "max-h-0"
          }`}
        >
          <div className="border-t border-slate-200 px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs text-slate-500">
                Controls are optional.
              </p>

              <button
                onClick={() => setShowAddControlModal(true)}
                className="text-indigo-600 text-sm font-medium hover:underline"
                type="button"
              >
                + Add Control
              </button>
            </div>

            {domain.controls?.length ? (
              <div className="space-y-3">
                {domain.controls.map((c: any) => (
                  <ControlRow
                    key={c.id}
                    control={c}
                    checklistId={checklistId}
                    domainId={domain.id}
                    onChanged={onChanged}
                  />
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

      {/* EDIT DOMAIN MODAL */}
      <AddDomainModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
        initialData={{
          name: domain.name,
          description: domain.description || "",
        }}
      />

      {/* ADD CONTROL MODAL */}
      <AddControlModal
        open={showAddControlModal}
        checklistId={checklistId}
        domainId={domain.id}
        onClose={() => setShowAddControlModal(false)}
        onSaved={() => {
          setShowAddControlModal(false);
          setOpen(true);
          onChanged();
        }}
      />
    </>
  );
}