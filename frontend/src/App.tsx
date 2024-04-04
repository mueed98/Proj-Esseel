import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { DrPortal } from "./pages/drportal";
import { Login } from "./pages/login";
import { MyPatients } from "./pages/mypatients";
import { Requests } from "./pages/requests";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/DrPortal" element={<DrPortal />} />
        <Route path="/MyPatients" element={<MyPatients />} />
        <Route path="/Requests" element={<Requests />} />
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
