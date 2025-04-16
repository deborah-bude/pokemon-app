import { getAllPokemons } from '../../getAllPokemons';
import { formatPokemonData } from './formatAllPokemonsData';

export const getFormattedPokemons = async (currentPage = 1) => {
    try {
        const pokemons = await getAllPokemons(currentPage);
        const formattedPokemons = await formatPokemonData(pokemons);
        return {
            pokemons: formattedPokemons,
            currentPage,
        };
    } catch (error) {
        console.error('Erreur lors du formatage des Pokémon :', error);
        throw error;
    }
};