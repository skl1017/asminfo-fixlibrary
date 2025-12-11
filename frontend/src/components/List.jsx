import { Link } from "react-router-dom";

export default function List({ elementList, endpoint }) {
  return (
    <ul className="flex flex-col gap-3 ml-2">
      {elementList.map((element) => {
        return (
          <li className="" key={element.id}>
            <Link
              className="block p-2 border  font-bold p-1 hover:text-white hover:bg-black hover:cursor-pointer"
              to={`${endpoint}/${element.id}`}
            >
              {element.title || element.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
