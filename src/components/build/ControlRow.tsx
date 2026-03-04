import { useState, useEffect } from "react";
import apiClient from "../../api/Axios";
import { Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react";

type Props = {
  control: any;
  checklistId: string;
  domainId: string;
  onChanged: () => void;
};

export default function ControlRow({
  control,
  checklistId,
  domainId,
  onChanged,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [editCode, setEditCode] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editRiskWeight, setEditRiskWeight] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [loadingQuestion, setLoadingQuestion] = useState(false);

  const basePath = `/checklists/${checklistId}/domains/${domainId}/controls/${control.id}`;

  // Sync edit state when control changes
  useEffect(() => {
    setEditCode(control.code || "");
    setEditTitle(control.title || "");
    setEditRiskWeight(control.riskWeight ?? 1);
  }, [control]);

  const isEditValid =
    editCode.trim().length > 0 && editTitle.trim().length > 0;

  // DELETE CONTROL
  const handleDeleteControl = async () => {
    const ok = window.confirm(
      `Delete control "${control.code} — ${control.title}"?`
    );
    if (!ok) return;

    try {
      setLoadingDelete(true);
      await apiClient.delete(basePath);
      onChanged();
    } catch (err: any) {
      console.error("Delete control error:", err?.response?.data || err);
      setError(
        err?.response?.data?.message || "Failed to delete control."
      );
    } finally {
      setLoadingDelete(false);
    }
  };

  // UPDATE CONTROL
  const handleUpdateControl = async () => {
    if (!isEditValid || loadingUpdate) return;

    try {
      setLoadingUpdate(true);
      setError(null);

      await apiClient.put(basePath, {
        code: editCode.trim(),
        title: editTitle.trim(),
        riskWeight:
          Number(editRiskWeight) > 0 ? Number(editRiskWeight) : 1,
      });

      setShowEdit(false);
      onChanged();
    } catch (err: any) {
      console.error("Update control error:", err?.response?.data || err);
      setError(
        err?.response?.data?.message || "Failed to update control."
      );
    } finally {
      setLoadingUpdate(false);
    }
  };

  // ADD QUESTION
  const handleAddQuestion = async () => {
    if (!questionText.trim() || loadingQuestion) return;

    try {
      setLoadingQuestion(true);

      await apiClient.post(`${basePath}/questions`, {
        text: questionText.trim(),
      });

      setQuestionText("");
      setShowAddQuestion(false);
      setOpen(true);
      onChanged();
    } catch (err: any) {
      console.error("Add question error:", err?.response?.data || err);
      setError(
        err?.response?.data?.message || "Failed to add question."
      );
    } finally {
      setLoadingQuestion(false);
    }
  };

  // DELETE QUESTION
  const handleDeleteQuestion = async (questionId: string) => {
    const ok = window.confirm("Delete this question?");
    if (!ok) return;

    try {
      await apiClient.delete(`${basePath}/questions/${questionId}`);
      onChanged();
    } catch (err: any) {
      console.error("Delete question error:", err?.response?.data || err);
      setError(
        err?.response?.data?.message || "Failed to delete question."
      );
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg">
      {/* HEADER */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-500 hover:text-slate-700"
          type="button"
        >
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className="flex-1">
          <div className="font-medium text-slate-800">
            {control.code} — {control.title}
          </div>
          <div className="text-xs text-slate-500">
            Risk Weight: {control.riskWeight}
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <button
            onClick={() => setShowEdit(true)}
            className="hover:text-indigo-600 transition"
            type="button"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={handleDeleteControl}
            disabled={loadingDelete}
            className="hover:text-red-600 transition disabled:opacity-40"
            type="button"
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={() => setShowAddQuestion(true)}
            className="text-indigo-600 text-sm font-medium hover:underline"
            type="button"
          >
            + Add Question
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="px-4 pb-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* EDIT PANEL */}
      {showEdit && (
        <div className="border-t border-slate-200 px-4 py-3 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-500">Code</label>
              <input
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-slate-500">Title</label>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">
                Risk Weight
              </label>
              <input
                type="number"
                value={editRiskWeight}
                onChange={(e) =>
                  setEditRiskWeight(Number(e.target.value))
                }
                min={1}
                className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setShowEdit(false)}
              className="px-3 py-2 text-sm rounded-md border border-slate-200 hover:bg-slate-50"
              type="button"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdateControl}
              disabled={!isEditValid || loadingUpdate}
              className="px-3 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              type="button"
            >
              {loadingUpdate ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {/* ADD QUESTION PANEL */}
      {showAddQuestion && (
        <div className="border-t border-slate-200 px-4 py-3 bg-white">
          <label className="text-xs text-slate-500">
            New question
          </label>

          <input
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
            placeholder="e.g. Is MFA enforced?"
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setShowAddQuestion(false)}
              className="px-3 py-2 text-sm rounded-md border border-slate-200 hover:bg-slate-50"
              type="button"
            >
              Cancel
            </button>

            <button
              onClick={handleAddQuestion}
              disabled={!questionText.trim() || loadingQuestion}
              className="px-3 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              type="button"
            >
              {loadingQuestion ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      )}

      {/* QUESTIONS LIST */}
      {open && (
        <div className="border-t border-slate-200 px-4 py-3">
          {control.questions?.length ? (
            <ul className="space-y-2">
              {control.questions.map((q: any) => (
                <li
                  key={q.id}
                  className="text-sm text-slate-700 flex items-start justify-between gap-3"
                >
                  <span>• {q.text}</span>

                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="text-slate-400 hover:text-red-600 transition"
                    type="button"
                    title="Delete question"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              No questions yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}