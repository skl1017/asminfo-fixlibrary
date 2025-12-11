import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_BASE_URL, CLIENT_BASE_URL } from "../constants/constants";
import Form from "./create/Form";
import FormValidateButton from "./create/FormValidateButton";

export default function Device() {
  const form = [
    {
      key: "title",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Titre du diagnostic",
    },
    {
      key: "description",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Description du diagnostic",
    },
  ];
  const navigate = useNavigate()
  const { category_id, device_id } = useParams();
  const [device, setDevice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enableForm, setEnableForm] = useState(false)
  const [formData, setFormData] = useState(
    Object.fromEntries(form.map((field) => [field.key, field.value])),
  );

  useEffect(() => {
    fetch(`${API_BASE_URL}/devices/${device_id}`)
      .then((res) => res.json())
      .then((data) => {
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
    <div>
      <h1 className="text-3xl font-bold mb-8">Appareil</h1>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{device.name}</h2>
          <div className="flex items-center gap-2">
            <p>Numéro de série: </p>
            <p className="font-bold">{device.serial_code}</p>
          </div>
        </div>

        <div className="flex gap-6">
          <button 
          className="p-3 border rounded-lg bg-black text-white font-bold p-1 size-max hover:cursor-pointer"
          onClick={()=>{setEnableForm(!enableForm)}}>
     
            + Créer un nouveau diagnostic
          </button>
          {enableForm && (
          <div className="flex flex-col gap-4">
            <Form form={form} formData={formData} setFormData={setFormData} />
            <FormValidateButton
              url={`${API_BASE_URL}/diagnostics`}
              payload={{ ...formData, device_id: device_id }}
              buttonTitle={"Créer"}
              callback={(response)=>{
                navigate(`/categories/${category_id}/devices/${device_id}/diagnostics/${response.id}`)
              }}
            />
          </div>
          )}

        </div>

        <div className="flex flex-col gap-4 w-60">
          <h3 className="font-bold">Diagnostics:</h3>
          <ul className="flex flex-col gap-3 ml-2">
            {device.diagnostics.map((diagnostic) => {
              return (
                <li
                  className="p-2 border rounded-lg bg-black text-white font-bold p-1"
                  key={diagnostic.id}
                >
                  <Link
                    className=""
                    to={`${CLIENT_BASE_URL}/categories/${category_id}/devices/${device_id}/diagnostics/${diagnostic.id}`}
                  >
                    {diagnostic.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
