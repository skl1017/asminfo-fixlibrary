import { useBreadcrumbs } from "../context/BreadcrumbContext";
import { Link } from "react-router-dom";

export default function Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <ul>
      {breadcrumbs.map((i, breadcrumb) => {
        <li key={i}>
          <Link to={breadcrumb.link}>{breadcrumb.title}</Link>
        </li>;
      })}
    </ul>
  );
}
