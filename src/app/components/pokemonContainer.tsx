import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pokemon from "../models/pokemon";
import { addPokemons, selectPokemons } from "../slices/pokemonSlice";
import PokemonEntry from "./pokemonEntry";


const PokemonContainer = () => {
    const pokemons = useSelector(selectPokemons);
    const dispatch = useDispatch();
    let offset = 0;

    const loadNextPokemons = () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`).then(res=>res.json()).then(data=>data.results).then(pokemons=>{
        offset += 20;
        dispatch(addPokemons(pokemons.map((pok: any)=>new Pokemon(pok.name, pok.url))));
      });
    }

    useEffect(()=>{
      console.log("mount")
      loadNextPokemons();
    }, [loadNextPokemons])


      return (<div>
        <h1>Pokemons</h1>
        {pokemons.map((pokemon: Pokemon, id: number)=><PokemonEntry key={id} pokemon={pokemon}/>)}
        </div>);  
    
} 

export default PokemonContainer;