import { getFormattedPokemon } from "@/app/api/formattedData/byId/byIdPokemon";
import CardPokemon from "@/app/features/ui/components/CardPokemon";
import Slider from "@/app/features/ui/components/Slider";
import { CardPokemonProps } from "@/app/features/ui/types/cardPokemon.types";
import { useEffect, useState } from "react";

async function getRandomPokemons(count = 4) {
  try {
    const ids = Array.from({ length: count }, () => Math.floor(Math.random() * 1008) + 1);

    const results = await Promise.all(
      ids.map(async (id) => {
        try {
          const pokemon = await getFormattedPokemon(id);
          return pokemon;
        } catch (err) {
          console.warn(`Erreur sur le Pokémon ID ${id}`, err);
          return null;
        }
      })
    );

    return results.filter(Boolean);
  } catch (error) {
    console.error('Erreur globale lors de la récupération des Pokémon aléatoires :', error);
    return [];
  }
}


const RandomPokemon = () => {
  const [randomPokemons, setRandomPokemons] = useState<CardPokemonProps["pokemon"][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchRandomPokemons() {
      setIsLoading(true);
      try {
        const pokemons = await getRandomPokemons(8);
        setRandomPokemons(pokemons);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémons :", error);
        setRandomPokemons([]);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchRandomPokemons();
  }, []);

  return (
    <section className="">
      <h2 className="text-2xl font-bold mb-4">Découvrez plusieurs pokemons</h2>
      <div className="p-4">
        {isLoading ?
          <div><p>Chargement des pokemons...</p></div>
        : <Slider>
          {randomPokemons.map((pokemon, i) => (
            <CardPokemon key={i} pokemon={pokemon} />
          ))}
        </Slider>}
      </div>
    </section>
  );
}

export default RandomPokemon;