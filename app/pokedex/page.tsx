"use client";
import { Button } from "@/app/features/ui/components/Button";
import { Input } from "@/app/features/ui/components/Input";
import ListPokemon from "@/app/features/ui/components/ListPokemons";
import { typeTranslations } from "@/app/features/ui/constant/typestranslation";

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
                    {Object.entries(typeTranslations).map(([key, value]) => (
                        <Button key={key} variant="outline" href="#">{value}</Button>
                    ))}
                </div>
            </div>

            <ListPokemon />
        </div>
    );
};