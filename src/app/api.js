const BASE_URL = 'https://pokeapi.co/api/v2';

const typeTranslations = {
  normal: 'Normal',
  fire: 'Feu',
  water: 'Eau',
  electric: 'Électrik',
  grass: 'Plante',
  ice: 'Glace',
  fighting: 'Combat',
  poison: 'Poison',
  ground: 'Sol',
  flying: 'Vol',
  psychic: 'Psy',
  bug: 'Insecte',
  rock: 'Roche',
  ghost: 'Spectre',
  dragon: 'Dragon',
  dark: 'Ténèbres',
  steel: 'Acier',
  fairy: 'Fée'
};

export async function getPokemonList(page = 1) {
  const limit = 20;
  const offset = (page - 1) * limit;
  
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  
  const pokemonsWithDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();
      
      const speciesResponse = await fetch(details.species.url);
      const species = await speciesResponse.json();
      const frenchName = species.names.find(name => name.language.name === 'fr')?.name;
      
      return {
        id: details.id,
        nom: frenchName || details.name,
        image: details.sprites.front_default,
        types: details.types.map(type => typeTranslations[type.type.name] || type.type.name)
      };
    })
  );
  
  return {
    pokemons: pokemonsWithDetails,
    totalPages: Math.ceil(data.count / limit),
    page: page
  };
}

export async function getMovesList(page = 1) {
  const limit = 20;
  const offset = (page - 1) * limit;
  
  const response = await fetch(`${BASE_URL}/move?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  
  const movesWithDetails = await Promise.all(
    data.results.map(async (attaque) => {
      const detailsResponse = await fetch(attaque.url);
      const details = await detailsResponse.json();
      const frenchName = details.names.find(name => name.language.name === 'fr')?.name;
      const frenchDescription = details.names.find(name => name.language.name === 'fr')?.name;
      
      return {
        id: details.id,
        nom: frenchName || details.name,
        type: typeTranslations[details.type.name] || details.type.name,
        puissance: details.power || '---',
        precision: details.accuracy || '---',
        description: frenchDescription || '---',
      };
    })
  );
  
  return {
    moves: movesWithDetails,
    // totalPages: Math.ceil(data.count / limit),
    page: page
  };
}
