import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadcrumbContext";
import { API_BASE_URL } from "../constants/constants";

export default function Category() {
  const { category_id } = useParams();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories/${category_id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des catégories :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">{category.name}</h2>
      <ul className="flex flex-col gap-3 w-50">
        {category.devices.map((device) => {
          return (
            <li className="p-2 border rounded-lg" key={device.id}>
              <Link to={`/categories/${category_id}/devices/${device.id}`}>
                <div className="flex flex-col">
                  <p className="font-bold">{device.name}</p>
                  <p className="text-sm pl">N° Modele : {device.serial_code}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
