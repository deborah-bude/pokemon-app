import { getPokemonById } from '../../getPokemonId';
import { formatResumePokemonData } from './formatResumePokemonData';

export const getFormattedPokemon = async (id: number) => {
    try {
        const pokemon = await getPokemonById(id);
        const formattedPokemons = await formatResumePokemonData(pokemon);
        return (formattedPokemons);
    } catch (error) {
        console.error('Erreur lors du formatage des Pokémon :', error);
        throw error;
    }
};