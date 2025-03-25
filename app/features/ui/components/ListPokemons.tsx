
import { getPokemonList } from '@/app/api/getAllPokemon';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import CardPokemon from './CardPokemon';

export default function ListPokemon() {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    async function loadPokemons() {
        try {
            setIsLoading(true);
            const data = await getPokemonList(page);
            setPokemons(data.pokemons);
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadPokemons();
    }, [page]);

    return (
        <>
            {isLoading ?
                <div><p>Chargement des pokemons...</p></div>
                :
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {pokemons.map((pokemon, i) => (
                        <CardPokemon key={i} pokemon={pokemon} />
                    ))}
                </div>}

            <div className="flex justify-center gap-2 mt-8">
                <Button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                    Page précédente
                </Button>
                <Button onClick={() => setPage(p => p + 1)}>
                    Page suivante
                </Button>
            </div>
        </>
    )
}