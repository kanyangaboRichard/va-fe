import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../feature/hooks/useAppDispatch";
import { fetchAssessments } from "../../feature/assessments/assessmentSlice";
import { useAppSelector } from "../../feature/hooks/useAppSelector";
import AppLayout from "../../layouts/appLayout";
import { Pencil  } from "lucide-react";
import { Search } from "lucide-react";

const Assessments = () => {
  const dispatch = useAppDispatch();
  const { assessments, isLoading, error } = useAppSelector(
    (state) => state.assessments
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAssessments());
  }, [dispatch]);

  //  Filter + Search
  const filteredAssessments = useMemo(() => {
    return assessments
      .filter((a: any) =>
        statusFilter === "ALL" ? true : a.status === statusFilter
      )
      .filter((a: any) =>
        a.name.toLowerCase().includes(search.toLowerCase())
      );
  }, [assessments, search, statusFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAssessments.length / itemsPerPage);
  const paginatedAssessments = filteredAssessments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) return <AppLayout><div className="p-6">Loading...</div></AppLayout>;
  if (error) return <AppLayout><div className="p-6 text-red-500">{error}</div></AppLayout>;

  return (
    <AppLayout>
      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Assessment Management</h1>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            + Start Assessment
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex gap-4 mb-6">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search assessment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2"
          >
            <option value="ALL">All</option>
            <option value="Draft">Draft</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* ASSESSMENT LIST */}
        <div className="space-y-4">
          {paginatedAssessments.map((assessment: any) => {
            const progress = assessment.progress || 0;
            const risk = assessment.riskLevel || "LOW";

            return (
              <div
                key={assessment.id}
                className="bg-white shadow rounded-lg p-6 flex justify-between items-center"
              >
                {/* LEFT */}
                <div className="space-y-2 w-2/3">
                  <h2 className="text-lg font-bold">{assessment.name}</h2>
                  <p className="text-sm text-gray-500">
                    Company: {assessment.company?.name || "N/A"}
                  </p>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full ${
                      assessment.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : assessment.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {assessment.status}
                  </span>

                  {/* Risk Badge */}
                  <span
                    className={`ml-2 inline-block px-3 py-1 text-xs rounded-full ${
                      risk === "HIGH"
                        ? "bg-red-100 text-red-700"
                        : risk === "MEDIUM"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {risk} Risk
                  </span>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="flex gap-4 text-indigo-600">
                  <Pencil size={20} />
                </div>
              </div>
            );
          })}

          {filteredAssessments.length === 0 && (
            <div className="text-gray-500">No assessments found.</div>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Assessments;
