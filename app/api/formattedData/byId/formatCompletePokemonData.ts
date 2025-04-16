interface Pokemon {
    species: {
        url: string;
    };
    name: string;
    id: number;
}

export async function formatResumePokemonData(pokemon: Pokemon) {
    try {
        // 1. On récupère les détails via l'endpoint qui contient les sprites
        const detailsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
        const details = await detailsResponse.json();

        // 2. On récupère les noms FR via species (langues)
        const speciesResponse = await fetch(pokemon.species.url);
        const species = await speciesResponse.json();

        const frenchName = species.names.find(
            (name: { language: { name: string }; name: string }) =>
                name.language.name === 'fr'
        )?.name;

        return {
            id: details.id,
            name: frenchName || details.name,
            sprite: details.sprites.other.showdown.front_default ? details.sprites.other.showdown.front_default : details.sprites.front_default,
            types: details.types.map((type: { type: { name: string } }) => type.type.name),
            height: details.height,
            weight: details.weight,
            baseExp: details.base_experience,

            cry: details.cries?.latest || null,

            stats: details.stats.map((s: any) => ({
                name: s.stat.name,
                value: s.base_stat,
            })),
        };
    } catch (err) {
        console.error('Erreur formatResumePokemonData :', err);
        throw err;
    }
}
