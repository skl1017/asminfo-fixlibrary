import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/constants";
import SearchOptions from "./SearchOptions";
import buildUrl from "../../utils/buildUrl";
import Form from "../create/Form";

export default function SearchBar({ form, setSearchResults, endpoint }) {
  const [searchParameters, setSearchParameters] = useState(
    Object.fromEntries(form.map((field) => [field.key, field.value])),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Object.values(searchParameters).every((element) => !element)) {
          setSearchResults([]);
          return;
        }
        const url = buildUrl(API_BASE_URL + endpoint, searchParameters);
        const result = await fetch(url);
        const data = await result.json();
        setSearchResults(data);
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, [searchParameters]);

  return (
    <Form
      form={form}
      formData={searchParameters}
      setFormData={setSearchParameters}
    />
  );
}
