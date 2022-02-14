import "./App.css";
import BookList from "./components/BookList";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Book App</h1>
          <BookList />
          <AddBook /> 
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
