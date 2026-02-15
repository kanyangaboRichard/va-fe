import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../layouts/pages/LandingPage";
import Login  from "../auth/Login"; 
import CompanyPage from "../layouts/pages/CompanyPage";

// import { AssessmentForm } from "../assessments/AssessmentForm"; // later
//import DomainPage from "../feature/domain/DomainPage();


export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  {path:"/companyPage", element: <CompanyPage />}
  // { path: "/domains", element: <DomainPage /> },
  // { path: "/app", element: <AssessmentForm /> },
]);
