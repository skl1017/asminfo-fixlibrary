import { useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function SearchDevice() {
  const [searchResults, setSearchResults] = useState([]);

  const form = [
    {
      key: "name",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Nom de l'appareil",
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

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl font-bold">Rechercher un appareil</h2>

      <SearchBar
        form={form}
        setSearchResults={setSearchResults}
        endpoint={"/devices/search"}
      />

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Resultats</h2>
        <ul className=" flex flex-col gap-2">
          {searchResults &&
            searchResults.map((result) => (
              <Link
                to={`/categories/${result.category_id}/devices/${result.id}`}
                key={result.id}
              >
                {result.name}
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}
