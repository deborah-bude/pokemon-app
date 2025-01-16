"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Pokemon() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => response.json())
                .then(data => setPokemon(data))
                .catch(error => console.error('Error fetching Pokémon:', error));
        }
    }, [id]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-xl">Nom : {pokemon.name}</h1>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-96 h-96 mb-2"
            />
            <p>Hauteur: {pokemon.height}</p>
            <p>Largeur: {pokemon.weight}</p>
        </div>
    );
}