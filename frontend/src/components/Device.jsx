import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_BASE_URL, CLIENT_BASE_URL } from "../constants/constants";

export default function Device() {
  const { category_id, device_id } = useParams();
  const [device, setDevice] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/devices/${device_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDevice(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des appareils :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">{device.name}</h2>
      <h2 className="text-2xl">{device.serial_code}</h2>

      <ul className="flex flex-col gap-3 w-50">
        {device.diagnostics.map((diagnostic) => {
          return (
            <li className="p-2 border rounded-lg" key={diagnostic.id}>
              <Link
                to={`${CLIENT_BASE_URL}/categories/${category_id}/devices/${device_id}/diagnostics/${diagnostic.id}`}
              >
                <div className="flex flex-col">
                  <p className="font-bold">{diagnostic.title}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
