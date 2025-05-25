import ArticlesTable from "./components/ArticlesTable";
import { IoIosAddCircle } from "react-icons/io";
import Link from "next/link";

export const metadata = {
  title: "Articles Page",
  description: "Here you can manage, create, and edit your articles.",
};

export default function ArticlesPage() {
  return (
    <>
      <div className="pageHead">
        <h1>
          Article List:
          <Link className="header-button" href={'/admin/articles/add'}>
            Add New <IoIosAddCircle />
          </Link>
        </h1>
        <p>Here you can manage, create, and edit your articles</p>
      </div>

      <ArticlesTable />
    </>
  );
}
