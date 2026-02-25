import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../feature/hooks/useAppDispatch";
import { useAppSelector } from "../../feature/hooks/useAppSelector";
import {fetchCompanies,addCompany,updateCompany,} from "../../feature/company/companySlice";
import CompanyCard from "../../components/companyCard";
import CompanyForm from "../../components/companyForm";
import type{ Company } from "../../types";
import AppLayout from "../../layouts/appLayout";

const CompanyPage = () => {
  const dispatch = useAppDispatch();
  const { companies, isLoading, error } = useAppSelector(
    (state) => state.companies
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] =
    useState<Company | null>(null);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

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

  return (
    <AppLayout>
      {/* ---------- LOADING ---------- */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      )}

      {/* ---------- ERROR ---------- */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700">Error: {error}</p>
          </div>
        </div>
      )}

      {/* ---------- MAIN ---------- */}
      {!isLoading && !error && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-6">
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
              + Add Company
            </button>
          </div>

          {companies.length === 0 ? (
            <p className="text-gray-500">
              No companies found.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
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
        </div>
      )}

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
