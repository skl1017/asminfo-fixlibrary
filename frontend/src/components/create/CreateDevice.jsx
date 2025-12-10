import { useEffect, useState } from "react";
import SearchOptions from "../search/SearchOptions";
import Form from "./Form";

export default function CreateDevice() {
  const form = {
    fields: [
      {
          key: 'name',
          value: null,
          type: "text",
          optionEndpoint:"",
          placeholder: "Nom de l'appareil"
        },
        {
          key: 'serial_code',
          value: null,
          type: "text",
          optionEndpoint:"",
          placeholder: "Numéro de série"
        },
        {
          key:'category_id',
          value: null,
          type: "select",
          optionEndpoint:"/categories",
          placeholder: "Assigner à une catégorie"

        },
        {
          key: 'vendor_id',
          value: null,
          type: "select",
          optionEndpoint:"/vendors",
          placeholder: "Assigner à un fabricant"
        }
    ]}
  return (
    <Form
      form={form}
    />
  );
}
