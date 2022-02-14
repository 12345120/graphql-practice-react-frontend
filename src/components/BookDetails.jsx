import { useQuery } from "@apollo/client";
import React from "react";
import { getBookQuery } from "../queries/queries";

function BookDetails({ bookId }) {
  const { data, loading, error } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });

  console.log("BookDetails Run");
  // on click, gets run 3 times --> bookId (prop) change, useQuery's initial/final data
  // useState --> on change, useQuery gets run again (bc child cmpt gets re-rendered too)
  // when you add book (AddBook), it refetches getBooksQuery (in BookList cmpt)
  // when that happens, ith it re-renders the cmpt --> which means BookDetails
  // gets re-rendered as well, triggering a refetch of getBookQuery as a result

  if (!data) return <div></div>;

  return (
    <div>
      <div>Book Details:</div>
      <div>{data.book.name}</div>
      <div>{data.book.genre}</div>
      <div>{data.book.author.name}</div>
      <p>All books by this author:</p>
      <ul>
        {data.book.author.books.map((book, index) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookDetails;
