import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  addBookMutation,
  getAuthorsQuery,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const { loading, data, error } = useQuery(getAuthorsQuery);
  const [addBook, { addBookLoading, addBookData, addBookError }] =
    useMutation(addBookMutation);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState();

  console.log("AddBook Run");

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  const submitForm = (e) => {
    e.preventDefault();

    addBook({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [getBooksQuery],
    });

    if (addBookError) console.log(addBookError);
  };

  return (
    <div>
      <form id="add-book" onSubmit={(e) => submitForm(e)}>
        <div className="field">
          <h5> Book name:</h5>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="field">
          <h5> Book genre:</h5>
          <input type="text" onChange={(e) => setGenre(e.target.value)} />
        </div>

        <div className="field">
          <h5> Author:</h5>
          <select name="" id="" onChange={(e) => setAuthorId(e.target.value)}>
            <option>select author</option>
            {data.authors.map((author, index) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <button>+</button>
      </form>
    </div>
  );
}

export default AddBook;
