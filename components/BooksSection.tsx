import Link from "next/link";
import { Book } from "@/components/ui/book";
import profileData from "@/data/profile.json";

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
  coverImage?: string;
};

interface BooksSectionProps {
  books?: BookItem[];
}

export function BooksSection({ books }: BooksSectionProps) {
  const data = books || profileData.books;
  const inProgressBooks = data.filter((book) => book.status === "in-progress");
  const readBooks = data.filter((book) => book.status !== "in-progress");

  const renderBooks = (books: BookItem[]) => (
    <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
      {books.map((book: BookItem, index: number) => {
        const BookComponent = (
          <Book
            author={book.author}
            color={book.color}
            coverImage={book.coverImage}
            textured={true}
            title={book.title}
            variant="stripe"
            width={160}
          />
        );

        if (book.url && book.url !== "#") {
          return (
            <Link
              className="group no-underline"
              href={book.url as any}
              key={index}
              target="_blank"
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
          <h3 className="mb-8 font-semibold">currently reading</h3>
          {renderBooks(inProgressBooks)}
        </div>
      )}

      {readBooks.length > 0 && (
        <div>
          <h3 className="mb-8 font-semibold">books read</h3>
          {renderBooks(readBooks)}
        </div>
      )}
    </div>
  );
}
