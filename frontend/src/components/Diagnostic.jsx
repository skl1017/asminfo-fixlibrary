import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../constants/constants";
import { Link } from "react-router-dom";

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

  return (<div>
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold">{diagnostic.title}</h2>
        <p>{diagnostic.description}</p>
      </div>
      <div className="flex flex-col gap-3">
        <p>Problèmes possibles:</p>
          <ul className="flex flex-col gap-3 w-50">
            {diagnostic.issues.map((issue) => {
              return (
                <li className="p-2 border rounded-lg" key={issue.id}>
                  <Link to={`/categories/${category_id}/devices/${device_id}diagnostics/${diagnostic_id}/issues/${issue.id}`}>
                    <div className="flex flex-col">
                      <p></p>
                      <p className="font-bold">{issue.title}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
      </div>
    </div>
  </div>)
}
