import { useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function SearchDevice() {
  const [searchResults, setSearchResults] = useState([]);

  const form = [
    {
      key: "title",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Titre du diagnostic",
    },
    {
      key: "device_name",
      value: null,
      type: "text",
      optionEndpoint: "",
      placeholder: "Nom de l'appareil associé",
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
      <h2 className="text-3xl font-bold">Rechercher un diagnostic</h2>

      <SearchBar
        form={form}
        setSearchResults={setSearchResults}
        endpoint={"/diagnostics/search"}
      />

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Resultats</h2>

        {searchResults && searchResults.length > 0 ? (
          <div>
            <div className="grid grid-cols-[250px_1fr] gap-4 p-2 border-b-2 border-gray-200">
              <p className="font-bold">Diagnostics</p>
              <p className="font-bold">Appareils</p>
            </div>

            <ul className="flex flex-col">
              {searchResults.map((result) => (
                <Link
                  className="grid grid-cols-[250px_1fr_120px] gap-4 p-2 even:bg-gray-100 odd:bg-blue-100 hover:opacity-80"
                  to={`/categories/${result.device.category_id}/devices/${result.device.id}/diagnostics/${result.id}`}
                  key={result.id}
                >
                  <p className="font-bold">{result.title}</p>
                  <p>{result.device.name}</p>
                  <p>{result.issues.length} problèmes liés</p>
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
