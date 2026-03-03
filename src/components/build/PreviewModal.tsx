import { useState } from "react";

interface Question {
  id: string;
  text: string;
}

interface Control {
  id: string;
  code: string;
  title: string;
  questions?: Question[];
}

interface Domain {
  id: string;
  name: string;
  controls?: Control[];
}

interface Props {
  checklistName: string;
  domains: Domain[];
}

const ChecklistPreview = ({ checklistName, domains }: Props) => {
  const [openDomainId, setOpenDomainId] = useState<string | null>(null);

  const toggleDomain = (id: string) => {
    setOpenDomainId(prev => (prev === id ? null : id));
  };

  return (
    <div className="bg-white p-8 text-sm text-slate-900">
      <h1 className="text-xl font-bold mb-6">{checklistName}</h1>

      {domains.map((domain, domainIndex) => {
        const isOpen = openDomainId === domain.id;

        return (
          <div key={domain.id} className="mb-6 border rounded-lg">

            {/* DOMAIN ROW */}
            <div
              onClick={() => toggleDomain(domain.id)}
              className="cursor-pointer bg-slate-100 px-4 py-3 flex justify-between items-center"
            >
              <h2 className="font-semibold">
                Domain {String.fromCharCode(65 + domainIndex)} - {domain.name}
              </h2>

              <span className="text-sm text-slate-500">
                {isOpen ? "▲ Collapse" : "▼ Expand"}
              </span>
            </div>

            {/* PREVIEW BELOW DOMAIN ROW */}
            {isOpen && (
              <div className="p-4">

                <table className="w-full border border-slate-400 border-collapse">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="border border-slate-400 p-2 w-12">No</th>
                      <th className="border border-slate-400 p-2 w-48">Controls</th>
                      <th className="border border-slate-400 p-2">
                        Assessment Requirements
                      </th>
                      <th className="border border-slate-400 p-2 w-16">YES</th>
                      <th className="border border-slate-400 p-2 w-16">NO</th>
                      <th className="border border-slate-400 p-2 w-16">N/A</th>
                      <th className="border border-slate-400 p-2 w-48">
                        Findings / Remarks
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {domain.controls?.map((control) =>
                      control.questions?.map((question, questionIndex) => (
                        <tr key={question.id}>
                          {questionIndex === 0 && (
                            <>
                              <td
                                rowSpan={control.questions?.length}
                                className="border border-slate-400 p-2 text-center align-top"
                              >
                                {control.code}
                              </td>

                              <td
                                rowSpan={control.questions?.length}
                                className="border border-slate-400 p-2 align-top"
                              >
                                {control.title}
                              </td>
                            </>
                          )}

                          <td className="border border-slate-400 p-2">
                            {questionIndex + 1}. {question.text}
                          </td>

                          <td className="border border-slate-400 text-center">☐</td>
                          <td className="border border-slate-400 text-center">☐</td>
                          <td className="border border-slate-400 text-center">☐</td>
                          <td className="border border-slate-400 p-2"></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChecklistPreview;