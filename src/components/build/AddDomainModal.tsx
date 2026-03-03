import { useState } from "react";

export default function AddDomainModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description?: string }) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Add New Domain
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">
              Domain Name
            </label>
            <input
              type="text"
              className="w-full mt-1 border border-slate-300 rounded-lg px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Access Control"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">
              Description (optional)
            </label>
            <textarea
              className="w-full mt-1 border border-slate-300 rounded-lg px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short explanation..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSave({ name, description });
              setName("");
              setDescription("");
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
          >
            Save Domain
          </button>
        </div>
      </div>
    </div>
  );
}