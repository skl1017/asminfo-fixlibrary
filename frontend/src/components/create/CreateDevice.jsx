import Form from "./Form";
import FormValidateButton from "./FormValidateButton";
import { API_BASE_URL } from "../../constants/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateDevice() {
  const navigate = useNavigate();
  const form = [
    {
      key: "name",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Nom de l'appareil",
    },
    {
      key: "serial_code",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Numéro de série",
    },
    {
      key: "category_id",
      value: null,
      type: "select",
      optionEndpoint: "/categories",
      placeholder: "Assigner à une catégorie",
    },
    {
      key: "vendor_id",
      value: null,
      type: "select",
      optionEndpoint: "/vendors",
      placeholder: "Assigner à un fabricant",
    },
  ];

  const [formData, setFormData] = useState(
    Object.fromEntries(form.map((field) => [field.key, field.value])),
  );

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl font-bold">Ajouter un appareil</h2>
      <Form form={form} formData={formData} setFormData={setFormData} />
      <FormValidateButton
        url={`${API_BASE_URL}/devices`}
        payload={formData}
        buttonTitle={"Ajouter"}
        callback={(response) => {
          navigate(
            `/categories/${response.category_id}/devices/${response.id}`,
          );
        }}
      />
    </div>
  );
}
