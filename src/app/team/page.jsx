import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';

const TeamBuilder = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Builder d'Équipe</h1>
                <Button>Sauvegarder l'équipe</Button>
            </div>

            {/* Zone de construction d'équipe */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="aspect-square">
                        <CardContent className="h-full flex flex-col items-center justify-center">
                            {i === 0 ? (
                                <>
                                    <img
                                        src="/api/placeholder/100/100"
                                        alt="Pokemon"
                                        className="mb-2"
                                    />
                                    <p className="text-sm font-medium">Pikachu</p>
                                </>
                            ) : (
                                <Button variant="outline" className="w-12 h-12 rounded-full">
                                    <Plus className="w-6 h-6" />
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Statistiques de l'équipe */}
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
        </div>
    );
};

export default TeamBuilder;