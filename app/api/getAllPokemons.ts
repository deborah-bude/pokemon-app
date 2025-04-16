const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getAllPokemons(currentPage = 1) {
    const limit = 20;
    const offset = (currentPage - 1) * limit;

    const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();

    return data.results;
}