import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selectedBookId, setSelectedBookId] = useState("");

  console.log("BookList Run");

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div>
      <ul>
        {data.books.map((book, index) => (
          <div key={book.id} onClick={(e) => setSelectedBookId(book.id)}>
            {book.name} -- {book.author.name}
          </div>
        ))}
      </ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  );
}

export default BookList;
