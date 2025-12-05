import { createContext, useState, useContext } from "react";

const BreadcrumbContext = createContext();

export function BreadcrumbProvider({ children }) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const addBreadcrumb = (item) => {
    setBreadcrumbs((prev) => [...prev, item]);
  };

  const removeBreadcrumb = (index) => {
    setBreadcrumbs((prev) => prev.filter((_, i) => i !== index));
  };

  const setAllBreadcrumbs = (items) => {
    setBreadcrumbs(items);
  };
  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbs,
        addBreadcrumb,
        removeBreadcrumb,
        setAllBreadcrumbs,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export const useBreadcrumbs = () => useContext(BreadcrumbContext);
