import { getFormattedPokemons } from '@/app/api/formattedData/allPokemons/allPokemons';
import { useEffect, useState } from 'react';
import { Button } from '../../../ui/components/Button';
import CardPokemon from '../../../ui/components/CardPokemon';

export default function ListPokemon() {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRandomPokemons() {
            setIsLoading(true);
            try {
                const data = await getFormattedPokemons(page);
                setPokemons(data.pokemons);
                setPage(data.currentPage);
            } catch (error) {
                console.error('Erreur lors du chargement des Pokémons :', error);
            }
            setIsLoading(false);
        }

        fetchRandomPokemons();
    }, [page]);

    return (
        <>
            {isLoading ?
                <div><p>Chargement des pokemons...</p></div>
                :
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {pokemons.map((pokemon, i) => (
                            <CardPokemon key={i} pokemon={pokemon} />
                        ))}
                    </div>

                    <div className="flex justify-center gap-2 mt-8">
                        <Button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                            Page précédente
                        </Button>
                        <Button onClick={() => setPage(p => p + 1)}>
                            Page suivante
                        </Button>
                    </div>
                </>
            }
        </>
    )
}