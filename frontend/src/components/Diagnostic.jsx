import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../constants/constants";
import { Link } from "react-router-dom";
import Form from "./create/Form";
import FormValidateButton from "./create/FormValidateButton";
import List from "./List";

export default function Diagnostic() {
  const issueForm = [
    {
      key: "title",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Titre du problème",
    },
    {
      key: "description",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Description du problème",
    },
  ];

  const navigate = useNavigate()
  const [issueFormData, setIssueFormData] = useState(
    Object.fromEntries(issueForm.map((field) => [field.key, field.value])),
  );
  const [enableForm, setEnableForm] = useState(false);
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

        <div className="flex gap-6">
          <button
            className="p-3 border rounded-lg bg-black text-white font-bold p-1 size-max hover:cursor-pointer "
            onClick={() => {
              setEnableForm(!enableForm)
            }}
          >
            + Créer un nouveau problème
          </button>
          <button />
          {enableForm && (
            <div className="flex flex-col gap-4 border border-gray-400 p-4">
              <p className="font-bold mb-4">
                Créer un nouveau problème
              </p>
              <Form
                form={issueForm}
                formData={issueFormData}
                setFormData={setIssueFormData}
              />
              <FormValidateButton
                url={`${API_BASE_URL}/issues`}
                payload={{ ...issueFormData, diagnostic_id: diagnostic_id }}
                buttonTitle={"Créer"}
                callback={(response) => {
                  navigate(`/categories/${category_id}/devices/${device_id}/diagnostics/${diagnostic_id}/issues/${response.id}`)
                }}
              />
            </div>
          )}
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
