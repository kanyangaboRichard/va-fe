// src/components/ChecklistTable.tsx
import StatusBadge from "./StatusBadge";
import type { Checklist } from "../api/checklistAPI";

type Props = {
  items: Checklist[];
  onOpenDomains: (checklistId: string) => void;
  onEdit: (item: Checklist) => void;
  onDelete: (id: string) => void;
};

export default function ChecklistTable({ items, onOpenDomains, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-700">
          <tr>
            <th className="px-6 py-3 font-semibold">Name</th>
            <th className="px-6 py-3 font-semibold">Description</th>
            <th className="px-6 py-3 font-semibold">Domains</th>
            <th className="px-6 py-3 font-semibold">Status</th>
            <th className="px-6 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {items.length === 0 ? (
            <tr>
              <td className="px-6 py-6 text-slate-500" colSpan={5}>
                No checklists found.
              </td>
            </tr>
          ) : (
            items.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <button
                    onClick={() => onOpenDomains(c.id)}
                    className="font-semibold text-indigo-700 hover:underline"
                    title="Open domains for this checklist"
                  >
                    {c.name}
                  </button>
                </td>
                <td className="px-6 py-4 text-slate-600">{c.description || "—"}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                    {c.domainCount ?? 0}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(c)}
                      className="rounded-lg border px-3 py-1.5 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(c.id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}