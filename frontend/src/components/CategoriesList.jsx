import { API_BASE_URL } from "../constants/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des catégories :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <></>;

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl font-bold">Catégories</h2>
      <ul className="flex flex-col gap-3 w-50">
        {categories.map((cat) => (
          <Link to={`/categories/${cat.id}/`} key={cat.id}>
            <p className="hover:underline">{cat.name}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
}
