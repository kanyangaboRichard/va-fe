import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../layouts/pages/admin/LandingPage";
import Login  from "../auth/Login"; 
import CompanyPage from "../layouts/pages/admin/CompanyPage";
import AssessmentPage from "../layouts/pages/admin/AssessmentPage";
import ChecklistPage from "../layouts/pages/admin/ChecklistPage";
import ChecklistDomainPage from "../layouts/pages/admin/ChecklistDomainPage";
import UsersPage from "../layouts/pages/admin/UsersPage";
import SetPasswordPage from "../layouts/pages/client/SetPasswordPage";
// import { AssessmentForm } from "../assessments/AssessmentForm"; // later


export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  {path:"/companyPage", element: <CompanyPage />},
  {path:"/AssessmentPage", element: <AssessmentPage />},
  {path:"/checklists", element: <ChecklistPage />},
  {path:"/checklists/:checklistId/domains", element: <ChecklistDomainPage />},
  {path:"/users", element: <UsersPage />},
  {path:"/set-password", element: <SetPasswordPage />},
  // { path: "/app", element: <AssessmentForm /> },
]);
