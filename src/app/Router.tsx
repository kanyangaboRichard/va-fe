import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../layouts/LandingPage";

 import Login  from "../auth/Login"; // later
// import { AssessmentForm } from "../assessments/AssessmentForm"; // later
//import DomainPage from "../feature/domain/DomainPage";


export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  // { path: "/domains", element: <DomainPage /> },
  // { path: "/app", element: <AssessmentForm /> },
]);
