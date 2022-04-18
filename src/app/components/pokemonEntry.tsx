import { useEffect, useState } from "react";
import Pokemon from "../models/pokemon";
import './styles/pokemonEntry.css'

const PokemonEntry = (props: {pokemon: Pokemon}): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [extended, setExtended] = useState(false);
    const [sprite, setSprite] = useState("");

    useEffect(() => {
        fetch(props.pokemon.url).then(res=>res.json()).then(pokemonData=>{
            props.pokemon.sprite = pokemonData.sprites.front_default;
            props.pokemon.weight = pokemonData.weight;
            props.pokemon.height = pokemonData.height;
            console.log(pokemonData.types);
            props.pokemon.types = pokemonData.types;
            setSprite(pokemonData.sprites.front_default);
        });
    }, [props])

    const handleClick = () => {
        setExtended(!extended);
    }

    return (<div onClick={handleClick} className="pokemon-entry">
        <img src={sprite} alt={`${props.pokemon.name}-sprite`}></img>
        <p>{props.pokemon.name}</p>
        {extended&& <div>
        <div>{props.pokemon.weight}</div>
        <div>{props.pokemon.height}</div>
        </div>
        }

        {props.pokemon.types.map((type: any, id: number)=><div key={id}>{type.type.name}</div>)}
        </div>)
};

export default PokemonEntry;