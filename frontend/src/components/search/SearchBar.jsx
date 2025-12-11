import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/constants";
import SearchOptions from "./SearchOptions";
import buildUrl from "../../utils/buildUrl";

export default function SearchBar({ setSearchResults }) {
  const [searchParameters, setSearchParameters] = useState({
    name: null,
    category_id: null,
    vendor_id: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          !searchParameters.name &&
          !searchParameters.category_id &&
          !searchParameters.vendor_id
        ) {
          setSearchResults([]);
          return;
        }
        const url = buildUrl(
          API_BASE_URL + "/devices/search",
          searchParameters,
        );
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
    <div className="flex gap-6">
      <SearchOptions
        type={"text"}
        optionEndpoint={""}
        placeholder={"Rechercher un appareil"}
        callback={(toChange) => {
          setSearchParameters({ ...searchParameters, name: toChange });
        }}
      />
      <SearchOptions
        type={"select"}
        optionEndpoint={"/categories"}
        placeholder={"Sélectionner une catégorie"}
        callback={(toChange) => {
          setSearchParameters({ ...searchParameters, category_id: toChange });
        }}
      />
      <SearchOptions
        type={"select"}
        optionEndpoint={"/vendors"}
        placeholder={"Sélectionner un fabricant"}
        callback={(toChange) => {
          setSearchParameters({ ...searchParameters, vendor_id: toChange });
        }}
      />
    </div>
  );
}
