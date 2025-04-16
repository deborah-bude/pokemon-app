
export async function formatPokemonData(pokemons: any[]) {
    const formattedPokemons = await Promise.all(
        pokemons.map(async (pokemon: { url: string }) => {
            const detailsResponse = await fetch(pokemon.url);
            const details = await detailsResponse.json();

            const speciesResponse = await fetch(details.species.url);
            const species = await speciesResponse.json();
            const frenchName = species.names.find((name: { language: { name: string }; name: string }) => name.language.name === 'fr')?.name;

            return {
                id: details.id,
                name: frenchName || details.name,
                sprite: details.sprites.other.showdown.front_default ? details.sprites.other.showdown.front_default : details.sprites.front_default,
                types: details.types.map((type: { type: { name: string } }) =>
                    type.type.name,
                )
            };
        })
    );

    return formattedPokemons;
}