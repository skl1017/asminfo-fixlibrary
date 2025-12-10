import { useBreadcrumbs } from "../context/BreadcrumbContext";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_BASE_URL } from "../constants/constants";
import { useEffect, useState } from "react";
async function getResource(endpoint, url) {
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    const objectResult = {
      name: data.name ?? data.title,
      url: url,
    };
    return objectResult;
  } catch (err) {
    throw err;
  }
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();

  let parsedPath = pathname.split("/").filter(Boolean);

  if (parsedPath.length % 2 !== 0) {
    parsedPath.pop();
  }

  const breadCrumbs = [];
  var url = "http://localhost:5173/";
  for (let i = 0; i < parsedPath.length; i += 2) {
    const endpoint = `${parsedPath[i]}/${parsedPath[i + 1]}/`;
    url += endpoint;
    breadCrumbs.push({ endpoint: endpoint, url: url });
  }
  const [results, setResults] = useState([]);

  useEffect(() => {
    const load = async () => {
      const base = API_BASE_URL;
      const data = await Promise.all(
        breadCrumbs.map((breadcrumb) =>
          getResource(`${API_BASE_URL}/${breadcrumb.endpoint}`, breadcrumb.url),
        ),
      );
      setResults(data);
    };
    load();
  }, [pathname]);

  return (
    <ol className="text-black flex gap-2 items-center mb-10">
      {results.map((res, index) => {
        const isLast = index === results.length - 1;

        return (
          <li key={res.id} className="flex items-center gap-2">
            {isLast ? (
              <span className="font-semibold">{res.name}</span>
            ) : (
              <Link to={res.url} className="hover:underline">
                {res.name}
              </Link>
            )}
            {!isLast && <span className="text-gray-400">›</span>}
          </li>
        );
      })}
    </ol>
  );
}
