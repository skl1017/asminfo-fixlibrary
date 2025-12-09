import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  return (
  <div>
  <SearchBar setSearchResults={setSearchResults} />

  {searchResults && searchResults.map((result) => (
    <div key={result.id}>{result.name}</div>
  ))}
</div>

  );
}
