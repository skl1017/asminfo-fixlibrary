import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../constants/constants";
import { Link } from "react-router-dom";

export default function Solution() {
  const { category_id, device_id, diagnostic_id, issue_id, solution_id } =
    useParams();
  const [solution, setSolution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/solutions/${solution_id}`)
      .then((res) => res.json())
      .then((data) => {
        setSolution(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des problèmes :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Solution</h1>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">{solution.title}</h2>
          <p>{solution.description}</p>
        </div>
      </div>
    </div>
  );
}
