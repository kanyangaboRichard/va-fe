import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../layouts/LandingPage";
import DomainPage from "../feature/domain/DomainPage";
// import { LoginPage } from "../auth/Login"; // later
// import { AssessmentForm } from "../assessments/AssessmentForm"; // later

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/domains", element: <DomainPage /> },
  // { path: "/login", element: <LoginPage /> },
  // { path: "/app", element: <AssessmentForm /> },
]);
