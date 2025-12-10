import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../constants/constants";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-3xl font-bold">Rechercher un appareil</h2>
      <SearchBar setSearchResults={setSearchResults} />

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
