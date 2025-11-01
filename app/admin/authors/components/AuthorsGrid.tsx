import AuthorCard from "./AuthorCard";
import { Author } from "@/app/types";

export default function AuthorsGrid({ authors }: { authors: Author[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {authors.map((author) => (
        <AuthorCard key={author.id} author={author} />
      ))}
    </div>
  );
}
