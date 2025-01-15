"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { getMovesList } from '../api';

const Moves = () => {
    const [moves, setMoves] = useState([]);
    const [page, setPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    async function loadMoves() {
        try {
            setIsLoading(true);
            const data = await getMovesList(page);
            setMoves(data.moves);
            setPage(data.page);
            // setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Erreur lors du chargement des attaques:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadMoves();
    }, [page]);

    if (isLoading) {
        return <div className="text-center p-8">Chargement des attaques...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Catalogue d'Attaques</h1>
                <div className="flex gap-4">
                    <Input placeholder="Rechercher une attaque..." className="w-64" />
                    <Button>Filtres</Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Physique</Button>
                    <Button variant="outline">Spécial</Button>
                    <Button variant="outline">Statut</Button>
                </div>
            </div>

            <div className="grid gap-4">
                {moves.map((move, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-lg">{move.nom}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <span className="px-2 py-1 bg-blue-100 rounded-full text-xs">Type : {move.type}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p>Puissance: {move.puissance}</p>
                                    <p>Précision: {move.precision}%</p>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-600">{move.description}</p>
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

export default Moves;