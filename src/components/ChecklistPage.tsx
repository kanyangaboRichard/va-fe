// src/pages/ChecklistPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/appLayout"; // use yours
import ChecklistTable from "../components/ChecklistTable";
import ChecklistModal from "../components/ChecklistModal";
import { useAppDispatch } from "../feature/hooks/useAppDispatch";
import { useAppSelector } from "../feature/hooks/useAppSelector";
import {fetchChecklists,addChecklist,editChecklist,removeChecklist, setChecklistSearch,} from "../feature/checklists/checklistSlice";
import type { Checklist } from "../feature/checklists/checklistAPI";

export default function ChecklistPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, isLoading, error, search } = useAppSelector((s) => s.checklists);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Checklist | null>(null);

  useEffect(() => {
    dispatch(fetchChecklists());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((c) => {
      const name = c.name?.toLowerCase() || "";
      const desc = (c.description || "").toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [items, search]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (item: Checklist) => {
    setEditing(item);
    setModalOpen(true);
  };

  const handleSubmit = async (data: { name: string; description?: string | null; status: any }) => {
    if (editing) {
      await dispatch(editChecklist({ id: editing.id, payload: data })).unwrap();
    } else {
      await dispatch(addChecklist(data)).unwrap();
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this checklist? This cannot be undone.");
    if (!ok) return;
    await dispatch(removeChecklist(id)).unwrap();
  };

  const openDomains = (checklistId: string) => {
    // Next step: we will build this page
    navigate(`/checklists/${checklistId}/domains`);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Checklist Management</h1>
            <p className="text-sm text-slate-600">
              Build checklists, then add domains and controls.
            </p>
          </div>

          <button
            onClick={openCreate}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            + New Checklist
          </button>
        </div>

        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => dispatch(setChecklistSearch(e.target.value))}
            placeholder="Search checklist name or description..."
            className="w-full max-w-md rounded-xl border bg-white px-4 py-2 outline-none focus:ring"
          />
          <button
            onClick={() => dispatch(fetchChecklists())}
            className="rounded-xl border bg-white px-4 py-2 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        {isLoading && <p className="text-slate-600">Loading checklists...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!isLoading && !error && (
          <ChecklistTable
            items={filtered}
            onOpenDomains={openDomains}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}

        <ChecklistModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSubmit}
          initial={editing}
          title={editing ? "Edit Checklist" : "Create Checklist"}
        />
      </div>
    </AppLayout>
  );
}