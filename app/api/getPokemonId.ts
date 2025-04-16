const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonById(id: number) {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${id}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(`Erreur lors de la récupération du Pokémon ${id} :`, error);
        throw error;
    }
}
