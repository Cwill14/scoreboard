import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import GameList from './components/GameList';
import AddGame from './components/AddGame';

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header>
          <h1>graphql client</h1>
        </header>
        <main>
          <GameList />
          <AddGame />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
