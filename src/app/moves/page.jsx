import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const Moves = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Catalogue d'Attaques</h1>
                <div className="flex gap-4">
                    <Input placeholder="Rechercher une attaque..." className="w-64" />
                    <Button>Filtres</Button>
                </div>
            </div>

            {/* Filtres */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Physique</Button>
                    <Button variant="outline">Spécial</Button>
                    <Button variant="outline">Statut</Button>
                </div>
            </div>

            {/* Liste des attaques */}
            <div className="grid gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-lg">Attaque #{i + 1}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <span className="px-2 py-1 bg-blue-100 rounded-full text-xs">Type</span>
                                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">Catégorie</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p>Puissance: 80</p>
                                    <p>Précision: 100%</p>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-600">Description de l'attaque et ses effets spéciaux éventuels.</p>
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

export default Moves;