import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../constants/constants";
import List from "./List";
import Form from "./create/Form";
import FormValidateButton from "./create/FormValidateButton";

export default function Issue() {

  const navigate = useNavigate()
  const solutionForm = [
    {
      key: "title",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Titre de la solution",
    },
    {
      key: "description",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Description de la solution",
    },
  ];
  const [solutionFormData, setSolutionFormData] = useState(
    Object.fromEntries(solutionForm.map((field) => [field.key, field.value])),
  );
  const { category_id, device_id, diagnostic_id, issue_id } = useParams();
  const [enableForm, setEnableForm] = useState(false);
  const [issue, setIssue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/issues/${issue_id}`)
      .then((res) => res.json())
      .then((data) => {
        setIssue(data);
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
      <h1 className="text-3xl font-bold mb-6">Problème</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">{issue.title}</h2>
          <p>{issue.description}</p>
        </div>

      <div className="flex gap-6">
                <button
                  className="p-3 border rounded-lg bg-black text-white font-bold p-1 size-max hover:cursor-pointer "
                  onClick={() => {
                    setEnableForm(!enableForm)
                  }}
                >
                  + Créer une nouvelle solution
                </button>
                <button />

                {enableForm && (
                  <div className="flex flex-col gap-4 border border-gray-400 p-4">
                    <p className="font-bold mb-4">
                      Créer une nouvelle solution
                    </p>
                    <Form
                      form={solutionForm}
                      formData={solutionFormData}
                      setFormData={setSolutionFormData}
                    />
                    <FormValidateButton
                      url={`${API_BASE_URL}/solutions`}
                      payload={{ ...solutionFormData, issue_id: issue_id }}
                      buttonTitle={"Créer"}
                      callback={(response) => {
                        navigate(`/categories/${category_id}/devices/${device_id}/diagnostics/${diagnostic_id}/issues/${issue_id}/solutions/${response.id}`)
                      }}
                    />
                  </div>
                )}
              </div>

        <div className="flex flex-col gap-5 w-60">
          <h2 className="font-bold">Solutions possibles:</h2>
          <List
            elementList={issue.solutions}
            endpoint={`/categories/${category_id}/devices/${device_id}/diagnostics/${diagnostic_id}/issues/${issue_id}/solutions`}
          />
        </div>
      </div>
    </div>
  );
}
