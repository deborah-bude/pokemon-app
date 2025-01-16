"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PlusIcon } from 'lucide-react';
import { getPokemonList } from '../api';
import { X } from 'lucide-react';

export default function TeamBuilder() {
    const [team, setTeam] = useState(Array(6).fill(null));
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [availablePokemons, setAvailablePokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadPokemons();
    }, [page]);

    const loadPokemons = async () => {
        try {
            const data = await getPokemonList(page);
            setAvailablePokemons(data.pokemons);
        } catch (error) {
            console.error("Erreur lors du chargement des Pokémon:", error);
        }
    };

    const openPokemonSelector = (slot) => {
        setSelectedSlot(slot);
    };

    const selectPokemon = (pokemon) => {
        const newTeam = [...team];
        const index = newTeam.findIndex(member => member === null);
        if (index !== -1) {
            newTeam[index] = pokemon;
        } else {
            console.warn("L'équipe est pleine !");
        }
        setTeam(newTeam);
    };

    const removePokemon = (slot) => {
        const newTeam = [...team];
        newTeam[slot] = null;
        setTeam(newTeam);
    };

    const filteredPokemons = availablePokemons.filter(pokemon =>
        pokemon.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Builder d'Équipe</h1>
                <Button>Sauvegarder l'équipe</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {team.map((pokemon, i) => (
                    <Card key={i} className="aspect-square">
                        <CardContent className="h-full flex flex-col items-center justify-center relative">
                            {pokemon ? (
                                <>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => removePokemon(i)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                    <img
                                        src={pokemon.image}
                                        alt={pokemon.nom}
                                        className="w-24 h-24 mb-2"
                                    />
                                    <p className="text-sm font-medium">{pokemon.nom}</p>
                                    <div className="flex gap-1 mt-1">
                                        {pokemon.types.map((type, index) => (
                                            <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                                {type}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Button
                                    variant="outline"
                                    className="w-12 h-12 rounded-full"
                                    onClick={() => openPokemonSelector(i)}
                                >
                                    <PlusIcon className="w-6 h-6" />
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Statistiques de l'équipe</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <h3 className="font-medium mb-2">Forces</h3>
                            <div className="space-y-1">
                                <div className="bg-green-100 px-3 py-1 rounded">Électrik +</div>
                                <div className="bg-green-100 px-3 py-1 rounded">Vol +</div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Faiblesses</h3>
                            <div className="space-y-1">
                                <div className="bg-red-100 px-3 py-1 rounded">Sol -</div>
                                <div className="bg-red-100 px-3 py-1 rounded">Roche -</div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Stats moyennes</h3>
                            <div className="space-y-1">
                                <div>Attaque: 80</div>
                                <div>Défense: 75</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-xl font-bold">Sélectionner un Pokémon</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {filteredPokemons && filteredPokemons.map((pokemon) => (
                        <li
                            key={pokemon.id}
                            onClick={() => selectPokemon(pokemon)}
                            className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-50"
                        >
                            <img src={pokemon.image} alt={pokemon.nom} className="w-20 h-20" />
                            <p className="font-medium">{pokemon.nom}</p>
                            <div className="flex gap-1 mt-1">
                                {pokemon.types.map((type) => (
                                    <span key={type} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center gap-2 mt-8">
                    <Button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                        Page précédente
                    </Button>
                    <Button onClick={() => setPage(p => p + 1)}>
                        Page suivante
                    </Button>
                </div>
            </div>
        </section>
    );
};

;