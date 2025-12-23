import { Routes, Route, Link } from "react-router-dom";
import CategoriesList from "./components/CategoriesList";
import Category from "./components/Category";
import Device from "./components/Device";
import Diagnostic from "./components/Diagnostic";
import Breadcrumbs from "./components/Breadcrumbs";
import Issue from "./components/Issue";
import "./App.css";
import Solution from "./components/Solution";
import SearchDevice from "./components/search/SearchDevice";
import CreateDevice from "./components/create/CreateDevice";
import SearchDiagnostic from "./components/search/SearchDiagnostic";

function App() {
  return (
    <>
      <header className="p-4 bg-black text-white mb-8 py-8 flex gap-16 items-center">
        <Link to="/">
          <h1 className="text-bold text-xl">ASMINFO</h1>
        </Link>
        <nav className="space-x-8">
          <Link className="hover:underline" to="/devices/search">
            Rechercher un appareil
          </Link>
          <Link className="hover:underline" to="/diagnostics/search">
            Rechercher un diagnostic
          </Link>

          <Link className="hover:underline" to="/devices/create">
            Ajouter un appareil
          </Link>

          <Link className="hover:underline" to="/categories">
            Catégories
          </Link>
        </nav>
      </header>
      <main className="m-4">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<SearchDevice />} />
          <Route path="/devices/search" element={<SearchDevice />} />
          <Route path="/diagnostics/search" element={<SearchDiagnostic />} />
          <Route path="/devices/create" element={<CreateDevice />} />

          <Route path="/categories" element={<CategoriesList />} />
          <Route path="/categories/:category_id/" element={<Category />} />
          <Route
            path="/categories/:category_id/devices/:device_id"
            element={<Device />}
          />
          <Route
            path="/categories/:category_id/devices/:device_id/diagnostics/:diagnostic_id"
            element={<Diagnostic />}
          />
          <Route
            path="/categories/:category_id/devices/:device_id/diagnostics/:diagnostic_id/issues/:issue_id"
            element={<Issue />}
          />
          <Route
            path="/categories/:category_id/devices/:device_id/diagnostics/:diagnostic_id/issues/:issue_id/solutions/:solution_id"
            element={<Solution />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
