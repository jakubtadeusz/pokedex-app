import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pokemon from "../models/pokemon";
import { selectPokemons } from "../slices/pokemonSlice";
import './styles/pokemonEntry.css'

const PokemonEntry = (props: {pokemon: Pokemon, pokemonId: number}): JSX.Element => {
    const pokemons = useSelector(selectPokemons);
    const [loading, setLoading] = useState(true);
    const [extended, setExtended] = useState(false);
    const [sprite, setSprite] = useState("");
    const [pokemon, setPokemon] = useState(props.pokemon);

    useEffect(()=>{
        if(pokemons[props.pokemonId].sprite !== undefined){
            setPokemon(pokemons[props.pokemonId]);
        }
    }, [pokemons])

    useEffect(()=>{
        if(pokemon.sprite === undefined){
            setLoading(true);
        }else{
            setLoading(false);
            setSprite(pokemon.sprite);
        }
    }, [pokemon])

    const handleClick = () => {
        setExtended(!extended);
    }

    return (<div onClick={handleClick} className="pokemon-entry">
        <div className="pokemon-name">{pokemon.name}</div>
        {!loading ?
        <div className="info">
            <div className="pokemon-info">
                <img src={sprite} alt={`${pokemon.name}-sprite`}></img>
                <div className="pokemon-types">
                    Types:
                    {pokemon.types.map((type: any, id: number)=><div key={id} className="pokemon-type">{type.type.name}</div>)}
                </div>
            </div>
            <div>        
                {extended&& 
                <div className="pokemon-info-extended">
                    <div>Weight: {pokemon.weight}</div>
                    <div>Height: {pokemon.height}</div>
                </div>
                }
            </div>
        </div>
        :
        <div>Loading</div>
        }
        </div>)
};

export default PokemonEntry;