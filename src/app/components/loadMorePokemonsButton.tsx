import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pokemon from "../models/pokemon";
import { addPokemons, selectLimit, selectOffset } from "../slices/pokemonSlice";

const LoadMorePokemonsButton = () => {
    const dispatch = useDispatch();
    const offset = useSelector(selectOffset);
    const limit = useSelector(selectLimit);
    const [buttonText, setButtonText] = useState("Load more pokemons");

    const handleButtonClick = () => {
        setButtonText("Loading...")
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`).then(res=>res.json()).then(data=>data.results).then(pokemons=>{
          dispatch(addPokemons(pokemons.map((pok: any)=>new Pokemon(pok.name, pok.url))));
          setButtonText("Load more pokemons");
        });
      }

    return (<div>
        <button onClick={handleButtonClick}>{buttonText}</button>
    </div>)
}

export default LoadMorePokemonsButton;