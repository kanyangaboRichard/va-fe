import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { useAppDispatch } from "../../feature/hooks/useAppDispatch";
import { useAppSelector } from "../../feature/hooks/useAppSelector";
import {fetchCompanies,addCompany,updateCompany,} from "../../feature/company/companySlice";
import CompanyCard from "../../components/CompanyCard";
import CompanyForm from "../../components/CompanyForm";
import type { Company } from "../../types";
import AppLayout from "../../layouts/appLayout";

type Option = {
  value: string;
  label: string;
};

const CompanyPage = () => {
  const dispatch = useAppDispatch();

  const { companies, isLoading, error } = useAppSelector(
    (state) => state.companies
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] =
    useState<Company | null>(null);

  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] =
    useState<Option | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  
     // BUILD INDUSTRY OPTIONS

  const industryOptions: Option[] = Array.from(
    new Set(companies.map((c) => c.industry))
  )
    .filter(Boolean)
    .map((industry) => ({
      value: industry,
      label:
        industry.charAt(0).toUpperCase() + industry.slice(1),
    }));

  
     //ADD / UPDATE COMPANY

  const handleAddEdit = async (
    companyData: Omit<Company, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      if (selectedCompany) {
        await dispatch(
          updateCompany({
            id: selectedCompany.id,
            data: companyData,
          })
        ).unwrap();

        toast.success("Company updated successfully");
      } else {
        await dispatch(addCompany(companyData)).unwrap();
        toast.success("Company created successfully");
      }

      setIsFormOpen(false);
      setSelectedCompany(null);
    } catch (err) {
      toast.error(err as string);
    }
  };

  // FILTERING

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesIndustry = industryFilter
      ? company.industry === industryFilter.value
      : true;

    return matchesSearch && matchesIndustry;
  });

  // PAGINATION

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(
    filteredCompanies.length / itemsPerPage
  );

  // UI

  return (
    <AppLayout>

      {/* LOADING */}

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">Error: {error}</p>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <div className="max-w-7xl mx-auto px-6 py-4 space-y-6">

          {/* HEADER */}

          <div className="flex justify-between items-center">

            <h1 className="text-3xl font-bold text-gray-900">
              Companies
            </h1>

            <button
              onClick={() => {
                setSelectedCompany(null);
                setIsFormOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Company
            </button>

          </div>

          {/* FILTER BAR */}

          <div className="flex gap-4">

            {/* SEARCH */}

            <input
              className="border px-3 py-2 rounded w-64"
              placeholder="Search company..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            {/* INDUSTRY FILTER */}

            <div className="w-64">

              <Select
                options={industryOptions}
                value={industryFilter}
                onChange={(option) => {
                  setIndustryFilter(option as Option | null);
                  setCurrentPage(1);
                }}
                placeholder="Filter industry"
                isClearable
              />

            </div>

          </div>

          {/* COMPANY GRID */}

          {filteredCompanies.length === 0 ? (
            <p className="text-gray-500">
              No companies found.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {paginatedCompanies.map((company) => (

                <CompanyCard
                  key={company.id}
                  company={company}
                  onEdit={() => {
                    setSelectedCompany(company);
                    setIsFormOpen(true);
                  }}
                />

              ))}

            </div>
          )}

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div className="flex justify-center gap-3 pt-4">

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.max(p - 1, 1)
                  )
                }
                className="px-3 py-1 border rounded"
              >
                Prev
              </button>

              <span>
                Page {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(p + 1, totalPages)
                  )
                }
                className="px-3 py-1 border rounded"
              >
                Next
              </button>

            </div>
          )}

        </div>
      )}

      {/* COMPANY FORM */}

      <CompanyForm
        company={selectedCompany || undefined}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCompany(null);
        }}
        onSubmit={handleAddEdit}
      />

    </AppLayout>
  );
};

export default CompanyPage;