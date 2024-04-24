import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { DrPortal } from "./pages/drportal";
import { Login } from "./pages/login";
import { MyPatients } from "./pages/mypatients";
import { Requests } from "./pages/requests";
import { Medication } from "./pages/medication";
import { RequestsDoctor } from "./pages/requestsDoctor";
import { MyDoctor } from "./pages/mydoctor";

function App() {
  const userType = sessionStorage.getItem("type");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DrPortal />} />
        <Route path="/my_patients" element={<MyPatients />} />
        <Route path="/my_doctor" element={<MyDoctor />} />
        <Route path="/request" element={<Requests />} />
        <Route path="/request-doctor" element={<RequestsDoctor />} />
        <Route path="/medication" element={<Medication />} />
      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
