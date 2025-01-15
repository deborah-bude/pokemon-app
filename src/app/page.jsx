"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { getRandomPokemons } from './api';

const Home = () => {
  const [randomPokemons, setRandomPokemons] = useState([]);

  useEffect(() => {
    async function fetchRandomPokemons() {
      try {
        const data = await getRandomPokemons(8);
        setRandomPokemons(data);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémon aléatoires:", error);
      }
    }

    fetchRandomPokemons();
  }, []);


  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur PokéApp</h1>
        <p className="text-xl mb-8">Explorez l'univers des Pokémon</p>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" href="/pokemon">
            Explorer le Pokédex
          </Button>
          <Button variant="outline">
            Créer une équipe
          </Button>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pokédex Complet</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Accédez à une base de données complète de tous les Pokémon avec leurs statistiques détaillées.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Builder d'Équipe</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Créez et analysez votre équipe parfaite avec notre outil de construction d'équipe avancé.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Catalogue d'Attaques</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Découvrez toutes les attaques disponibles et leurs effets pour optimiser vos stratégies.</p>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Pokémon Aléatoires</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {randomPokemons.map((pokemon, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <img
                  src={pokemon.image}
                  alt="Pokemon"
                  className="mx-auto mb-2"
                />
                <p className="font-medium">{pokemon.nom}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;