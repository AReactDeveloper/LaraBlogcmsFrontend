import CommentsTable from "./ui/CommentsTable";

export const metadata = {
  title: "Comments Page",
  description: "Here you can manage, create, and edit your comments.",
};

export default function Comments() {
  return (
    <>
      <div className="pageHead">
        <h1>
          Comments List:
        </h1>
        <p>Here you can manage, create, and edit your comments</p>
      </div>

      <CommentsTable />
    </>
  );
}
