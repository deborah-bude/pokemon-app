import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const Pokedex = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Pokédex</h1>
                <div className="flex gap-4">
                    <Input placeholder="Rechercher un Pokémon..." className="w-64" />
                    <Button>Filtres</Button>
                </div>
            </div>

            {/* Filtres */}
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
                {Array.from({ length: 20 }).map((_, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                            <img
                                src={`/api/placeholder/150/150`}
                                alt="Pokemon"
                                className="w-full h-auto mb-2"
                            />
                            <div className="text-center">
                                <p className="font-medium">Pokémon #{i + 1}</p>
                                <div className="flex justify-center gap-2 mt-2">
                                    <span className="px-2 py-1 bg-red-100 rounded-full text-xs">Type 1</span>
                                    <span className="px-2 py-1 bg-blue-100 rounded-full text-xs">Type 2</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
                <Button variant="outline">Précédent</Button>
                <Button variant="outline">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Suivant</Button>
            </div>
        </div>
    );
};

export default Pokedex;