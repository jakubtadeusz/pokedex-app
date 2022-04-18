import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pokemon from "../models/pokemon";
import { addPokemons, selectLimit, selectOffset, updatePokemon } from "../slices/pokemonSlice";
import './styles/loadMorePokemonsButton.css'

const LoadMorePokemonsButton = () => {
    const dispatch = useDispatch();
    const offset = useSelector(selectOffset);
    const limit = useSelector(selectLimit);
    const [buttonText, setButtonText] = useState("Load more pokemons");

    const handleButtonClick = () => {
        setButtonText("Loading...")
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`).then(res=>res.json()).then(data=>data.results).then(pokemons=>{
          dispatch(addPokemons(pokemons.map((pok: any)=>new Pokemon(pok.name, pok.url))));
          for (const pokemon of pokemons) {
            fetch(pokemon.url)
              .then((res) => res.json())
              .then((pokemonData) => {
                pokemon.sprite = pokemonData.sprites.front_default;
                pokemon.weight = pokemonData.weight;
                pokemon.height = pokemonData.height;
                pokemon.types = pokemonData.types;
                dispatch(updatePokemon(pokemon))
              });
          }
          setButtonText("Load more pokemons");
        });
      }


    return (<div className="load-pokemons">
        <button type="button" className="btn btn-primary" onClick={handleButtonClick}>{buttonText}</button>
    </div>)
}

export default LoadMorePokemonsButton;