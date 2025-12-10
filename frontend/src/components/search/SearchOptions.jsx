import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/constants";
import Select from "react-select";

export default function SearchOptions({
  optionEndpoint,
  placeholder,
  callback,
  type,
}) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type !== "select" || !optionEndpoint) return;
        const result = await fetch(API_BASE_URL + optionEndpoint);
        const data = await result.json();
        setOptions(
          data.map((element) => ({
            value: element.id,
            label: element.name,
          })),
        );
        console.log(data);
      } catch (e) {
        setOptions([]);
      }
    };
    fetchData();
  }, [optionEndpoint]);

  if (type == "select") {
    return (
      <Select
        placeholder={placeholder}
        options={options}
        onChange={(selected) => {
          if (selected) {
            callback(selected.value);
          } else {
            callback(null);
          }
        }}
        inputValue={inputValue}
        onInputChange={(val) => {
          setInputValue(val);
        }}
        isClearable
      />
    );
  } else if (type == "text") {
    return (
      <input
        type="text"
        placeholder={placeholder}
        className="border px-2 rounded border-gray-300"
        onChange={(val) => {
          callback(val.target.value);
        }}
      />
    );
  }
}
