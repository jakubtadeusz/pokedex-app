import React from 'react';
import './App.css';
import LoadMorePokemonsButton from './app/components/loadMorePokemonsButton';
import PokemonContainer from './app/components/pokemonContainer';

function App() {
  return (
    <div className="App">
      <header>Pokedex</header>
      <PokemonContainer/>
      <LoadMorePokemonsButton/>
      <footer>Jakub Tadeusz</footer>
    </div>
  );
}

export default App;
