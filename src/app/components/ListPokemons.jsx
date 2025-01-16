import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { getPokemonList } from '../api';
import Link from 'next/link';

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
                        <Link key={i} href={`/pokemon/${pokemon.id}`} passHref>
                            <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                                <CardContent className="p-4">
                                    <img
                                        src={pokemon.image}
                                        alt="Pokemon"
                                        className="w-full h-auto mb-2"
                                    />
                                    <div className="text-center">
                                        <p className="font-medium">{pokemon.nom}</p>
                                        <div className="flex justify-center gap-2 mt-2">
                                            {pokemon.types.map((type, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-blue-100 rounded-full text-xs"
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
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