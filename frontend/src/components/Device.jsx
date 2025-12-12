import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_BASE_URL, CLIENT_BASE_URL } from "../constants/constants";
import Form from "./create/Form";
import FormValidateButton from "./create/FormValidateButton";
import List from "./List";

export default function Device() {
  const navigate = useNavigate();
  const { category_id, device_id } = useParams();
  const diagnosticForm = [
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
  const componentForm = [
    {
      key: "component_id",
      value: null,
      type: "select",
      optionEndpoint: `/devices/${device_id}/available-components`,
      placeholder: "Composant à ajouter à l'appareil",
    },
  ];
  const [device, setDevice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enableForm, setEnableForm] = useState(0);
  const [diagnosticFormData, setDiagnosticFormData] = useState(
    Object.fromEntries(diagnosticForm.map((field) => [field.key, field.value])),
  );
  const [componentFormData, setComponentFormData] = useState(
    Object.fromEntries(componentForm.map((field) => [field.key, field.value])),
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
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{device.name}</h2>
          <div className="flex items-center gap-2">
            <p>Numéro de Référence: </p>
            <p className="font-bold">{device.serial_code}</p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <button
              className="p-3 border rounded-lg bg-black text-white font-bold p-1 size-max hover:cursor-pointer "
              onClick={() => {
                if (enableForm == 1) setEnableForm(0);
                else setEnableForm(1);
              }}
            >
              + Ajouter un composant
            </button>
            <button
              className="p-3 border rounded-lg bg-black text-white font-bold p-1 size-max hover:cursor-pointer "
              onClick={() => {
                if (enableForm == 2) setEnableForm(0);
                else setEnableForm(2);
              }}
            >
              + Créer un nouveau diagnostic
            </button>
          </div>

          {enableForm == 1 && (
            <div className="flex flex-col gap-4 border border-gray-400 p-4">
              <p className="font-bold mb-4">
                Ajouter un composant existant à l'appareil
              </p>
              <Form
                form={componentForm}
                formData={componentFormData}
                setFormData={setComponentFormData}
              />
              <FormValidateButton
                url={`${API_BASE_URL}/devices/${device_id}/link-component`}
                payload={{ ...componentFormData, device_id: device_id }}
                buttonTitle={"Créer"}
                callback={(response) => {
                  window.location.reload();
                }}
              />
            </div>
          )}

          {enableForm == 2 && (
            <div className="flex flex-col gap-4 border border-gray-400 p-4">
              <p className="font-bold mb-4">Nouveau diagnostic</p>
              <Form
                form={diagnosticForm}
                formData={diagnosticFormData}
                setFormData={setDiagnosticFormData}
              />
              <FormValidateButton
                url={`${API_BASE_URL}/diagnostics`}
                payload={{ ...diagnosticFormData, device_id: device_id }}
                buttonTitle={"Créer"}
                callback={(response) => {
                  navigate(
                    `/categories/${category_id}/devices/${device_id}/diagnostics/${response.id}`,
                  );
                }}
              />
            </div>
          )}
        </div>

        <div className="flex gap-32">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold">Composants: </h3>
            <div className="flex gap-2 ml-2">
              <div className="w-px bg-black"></div>
              <ul className="flex flex-col gap-2">
                {device.components.map((component) => (
                  <li className="">{component.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-4 w-60">
              <h3 className="font-bold">Diagnostics:</h3>
              <List
                elementList={device.diagnostics}
                endpoint={`/categories/${category_id}/devices/${device_id}/diagnostics`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
