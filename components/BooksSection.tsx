import { Favicon } from "@/components/ui/Favicon";
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
};

export function BooksSection() {
  return (
    <div>
      <h3 className="font-semibold mb-2">books read</h3>
      <div className="space-y-1 text-sm leading-relaxed">
        {profileData.books.map((book: BookItem, index: number) => (
          <BookListItem key={index} book={book} />
        ))}
      </div>
    </div>
  );
}

function BookListItem({ book }: { book: BookItem }) {
  const statusIndicator =
    book.status === "in-progress" ? (
      <span className="inline-flex items-center ml-1">
        <svg
          className="w-3 h-3 animate-spin text-blue-500 dark:text-sky-500"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </span>
    ) : (
      ""
    );

  return (
    <p className="leading-relaxed">
      {book.url && book.url !== "#" ? (
        <Link
          href={book.url as any}
          className="text-blue-500 dark:text-sky-500"
          target="_blank"
        >
          <Favicon
            url={book.url}
            invert={book.invertFavicon}
            hide={book.hideFavicon}
          />
          {book.title}
        </Link>
      ) : (
        <span className="text-muted-foreground">{book.title}</span>
      )}{" "}
      <span className="text-muted-foreground">by {book.author}</span>
      {statusIndicator}
    </p>
  );
}
