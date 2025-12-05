import { Routes, Route, Link } from "react-router-dom";
import CategoriesList from "./components/CategoriesList";
import Category from "./components/Category";
import Device from "./components/Device";
import Diagnostic from "./components/Diagnostic";
import Breadcrumbs from "./components/Breadcrumbs";
import "./App.css";

function App() {
  return (
    <>
      <header className="p-4 bg-black text-white mb-8 py-8">
        <nav className="space-x-4">
          <Link className="hover:underline" to="/categories">
            Catégories
          </Link>
        </nav>
      </header>
      <main className="m-4">
        <Routes>
          <Route path="/categories" element={<CategoriesList />} />
          <Route
            path="/categories/:category_id/devices"
            element={<Category />}
          />
          <Route
            path="/categories/:category_id/devices/:device_id"
            element={<Device />}
          />
          <Route
            path="/categories/:category_id/devices/:device_id/diagnostics/:diagnostic_id"
            element={<Diagnostic />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
