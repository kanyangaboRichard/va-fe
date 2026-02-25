import { useEffect, useState } from "react";
import type { Checklist, ChecklistStatus } from "../feature/checklists/checklistAPI";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description?: string | null; status: ChecklistStatus }) => void;
  initial?: Checklist | null;
  title: string;
};

export default function ChecklistModal({ open, onClose, onSubmit, initial, title }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<ChecklistStatus>("ACTIVE");

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setDescription(initial.description || "");
      setStatus(initial.status);
    } else {
      setName("");
      setDescription("");
      setStatus("ACTIVE");
    }
  }, [initial, open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      description: description.trim() ? description.trim() : null,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="rounded-lg px-2 py-1 hover:bg-slate-100">
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. CYBERSECURITY AUDIT CHECKLIST"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description..."
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring"
              value={status}
              onChange={(e) => setStatus(e.target.value as ChecklistStatus)}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="DRAFT">DRAFT</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t p-5">
          <button onClick={onClose} className="rounded-lg px-4 py-2 hover:bg-slate-100">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}