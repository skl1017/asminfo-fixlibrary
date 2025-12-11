import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../constants/constants";
import { Link } from "react-router-dom";
import List from "./List";

export default function Diagnostic() {
  const { category_id, device_id, diagnostic_id } = useParams();
  const [diagnostic, setDiagnostic] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/diagnostics/${diagnostic_id}`)
      .then((res) => res.json())
      .then((data) => {
        setDiagnostic(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des diagnostics :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Diagnostic</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{diagnostic.title}</h2>
          <p>{diagnostic.description}</p>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-bold">Problèmes possibles:</h3>
          <ul className="flex flex-col gap-3 w-50 ml-3">
            <List
              elementList={diagnostic.issues}
              endpoint={`/categories/${category_id}/devices/${device_id}/diagnostics/${diagnostic_id}/issues`}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
