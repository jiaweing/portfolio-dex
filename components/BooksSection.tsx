"use client";
import { InView } from "@/components/core/in-view";
import profileData from "@/data/profile.json";
import Link from "next/link";

type BookItem = {
  title: string;
  author: string;
  lastHighlighted?: string;
  highlights?: number;
  status: string;
  url: string;
};

export function BooksSection() {
  return (
    <div>
      <InView
        variants={{
          hidden: { opacity: 0, x: -30, y: 10, filter: "blur(4px)" },
          visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewOptions={{ once: true, amount: 0.1 }}
      >
        <h3 className="font-semibold mb-2">books read</h3>
      </InView>
      <div className="space-y-1 text-sm">
        {profileData.books.map((book: BookItem, index: number) => (
          <InView
            key={index}
            variants={{
              hidden: { opacity: 0, x: -20, y: 10, filter: "blur(3px)" },
              visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: 0.1 + index * 0.08, // Reduced base delay
            }}
            viewOptions={{ once: true, amount: 0.1 }}
          >
            <BookListItem book={book} />
          </InView>
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
          className="w-3 h-3 animate-spin text-blue-500"
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
    <p>
      {book.url && book.url !== "#" ? (
        <Link href={book.url} className="text-blue-500" target="_blank">
          {book.title}
        </Link>
      ) : (
        <span className="text-muted-foreground">{book.title}</span>
      )}{" "}
      by {book.author}
      {statusIndicator}
    </p>
  );
}
