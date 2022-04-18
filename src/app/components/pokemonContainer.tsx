import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pokemon from "../models/pokemon";
import { addPokemons, selectLimit, selectOffset, selectPokemons } from "../slices/pokemonSlice";
import PokemonEntry from "./pokemonEntry";


const PokemonContainer = () => {
    const pokemons = useSelector(selectPokemons);
    const offset = useSelector(selectOffset);
    const limit = useSelector(selectLimit);
    const dispatch = useDispatch();
    

    const loadNextPokemons = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`).then(res=>res.json()).then(data=>data.results).then(pokemons=>{
        dispatch(addPokemons(pokemons.map((pok: any)=>new Pokemon(pok.name, pok.url))));
      });
    }

    useEffect(()=>{
      loadNextPokemons();
    }, [dispatch])


      return (<div>
        <h1>Pokemons</h1>
        <h2>{offset}</h2>
        {pokemons.map((pokemon: Pokemon, id: number)=><PokemonEntry key={id} pokemon={pokemon}/>)}
        </div>);  
    
} 

export default PokemonContainer;