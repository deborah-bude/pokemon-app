"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { getPokemonList } from '../api';

const Pokedex = () => {
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

    if (isLoading) return <div>Chargement...</div>;

    console.log(pokemons);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Pokédex</h1>
                <div className="flex gap-4">
                    <Input placeholder="Rechercher un Pokémon..." className="w-64" />
                    <Button>Filtres</Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-wrap gap-2">
                    {['Normal', 'Feu', 'Eau', 'Plante', 'Électrik'].map((type) => (
                        <Button
                            key={type}
                            variant="outline"
                            className="rounded-full"
                        >
                            {type}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {pokemons.map((pokemon, i) => (
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
        </div>
    );
};

export default Pokedex;