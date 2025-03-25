import { getPokemonById } from "@/app/api/getPokemonId";
import CardPokemon from "@/app/features/ui/components/CardPokemon";
import Slider from "@/app/features/ui/components/Slider";
import { CardPokemonProps } from "@/app/features/ui/types/cardPokemon.types";
import { useEffect, useState } from "react";

async function getRandomPokemons(count = 4) {
  try {
    const randomIds = Array.from({ length: count }, () => Math.floor(Math.random() * 1008) + 1);
    const pokemonsWithDetails = await Promise.all(
      randomIds.map(async (id) => await getPokemonById(id))
    );
    console.log(pokemonsWithDetails);
    return pokemonsWithDetails;
  } catch (error) {
    console.error('Erreur lors de la récupération des Pokémon aléatoires :', error);
    throw error;
  }
}

const RandomPokemon = () => {
  const [randomPokemons, setRandomPokemons] = useState<CardPokemonProps["pokemon"][]>([]);

  useEffect(() => {
    async function fetchRandomPokemons() {
      try {
        const pokemons = await getRandomPokemons(8);
        setRandomPokemons(pokemons);
      } catch (error) {
        console.error("Erreur lors du chargement des Pokémon :", error);
      }
    }

    fetchRandomPokemons();
  }, []);
  return (
    <section className="">
      <h2 className="text-2xl font-bold mb-4">Découvrez plusieurs pokemons</h2>
      <div className="p-4">
        <Slider>
          {randomPokemons.map((pokemon, i) => (
            <CardPokemon key={i} pokemon={pokemon} />
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default RandomPokemon;