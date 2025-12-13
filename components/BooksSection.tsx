import { Book } from "@/components/ui/book";
import profileData from "@/data/profile.json";
import Link from "next/link";

type BookItem = {
  title: string;
  author: string;
  lastHighlighted?: string;
  highlights?: number;
  status: string;
  url: string;
  invertFavicon?: boolean | "light" | "dark" | "always";
  hideFavicon?: boolean;
  color?: string;
};

export function BooksSection() {
  const inProgressBooks = profileData.books.filter(
    (book) => book.status === "in-progress"
  );
  const readBooks = profileData.books.filter(
    (book) => book.status !== "in-progress"
  );

  const renderBooks = (books: BookItem[]) => (
    <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
      {books.map((book: BookItem, index: number) => {
        const BookComponent = (
          <Book
            title={book.title}
            author={book.author}
            variant="stripe"
            width={160}
            textured={true}
            color={book.color}
          />
        );

        if (book.url && book.url !== "#") {
          return (
            <Link
              key={index}
              href={book.url as any}
              target="_blank"
              className="no-underline group"
            >
              {BookComponent}
            </Link>
          );
        }

        return <div key={index}>{BookComponent}</div>;
      })}
    </div>
  );

  return (
    <div className="space-y-16">
      {inProgressBooks.length > 0 && (
        <div>
          <h3 className="font-semibold mb-8">currently reading</h3>
          {renderBooks(inProgressBooks)}
        </div>
      )}

      {readBooks.length > 0 && (
        <div>
          <h3 className="font-semibold mb-8">books read</h3>
          {renderBooks(readBooks)}
        </div>
      )}
    </div>
  );
}
