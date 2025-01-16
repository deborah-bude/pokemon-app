"use client";
import React from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import ListPokemon from '../components/ListPokemons';

const types = ['Normal', 'Feu', 'Eau', 'Électrik', 'Plante', 'Glace', 'Combat', 'Poison', 'Sol', 'Vol', 'Psy', 'Insecte', 'Roche', 'Spectre', 'Dragon', 'Ténèbres', 'Acier', 'Fée'];

export default function Pokedex() {
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
                    {types.map((type) => (
                        <Button key={type} variant="outline">{type}</Button>
                    ))}
                </div>
            </div>

            <ListPokemon />
        </div>
    );
};