import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../layouts/pages/LandingPage";
import Login  from "../auth/Login"; 
import CompanyPage from "../layouts/pages/CompanyPage";
import AssessmentPage from "../layouts/pages/AssessmentPage";
import ChecklistPage from "../layouts/pages/ChecklistPage";
import ChecklistDomainPage from "../layouts/pages/ChecklistDomainPage";
// import { AssessmentForm } from "../assessments/AssessmentForm"; // later


export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  {path:"/companyPage", element: <CompanyPage />},
  {path:"/AssessmentPage", element: <AssessmentPage />},
  {path:"/checklists", element: <ChecklistPage />},
  {path:"/checklists/:checklistId/domains", element: <ChecklistDomainPage />},
  // { path: "/app", element: <AssessmentForm /> },
]);
