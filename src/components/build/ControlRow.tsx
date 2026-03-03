import { useState } from "react";

export default function ControlRow({ control }: { control: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg">
      <div className="px-4 py-3 flex items-center justify-between">
        <button onClick={() => setOpen(!open)} className="text-slate-500 hover:text-slate-700">
          {open ? "▾" : "▸"}
        </button>

        <div className="flex-1 ml-2">
          <div className="font-medium text-slate-800">
            {control.code} — {control.title}
          </div>
          <div className="text-xs text-slate-500">Risk Weight: {control.riskWeight}</div>
        </div>

        <button className="text-indigo-600 text-sm font-medium hover:underline">
          + Add Question
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 px-4 py-3">
          {control.questions?.length ? (
            <ul className="space-y-2">
              {control.questions.map((q: any) => (
                <li key={q.id} className="text-sm text-slate-700">
                  • {q.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No questions yet.</p>
          )}
        </div>
      )}
    </div>
  );
}