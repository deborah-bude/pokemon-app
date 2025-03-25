
const BASE_URL = 'https://pokeapi.co/api/v2';

type GetServerSidePropsContext = {
    query: {
        page: string;
    };
};

export async function getPokemonList(page = 1) {
    const limit = 20;
    const offset = (page - 1) * limit;

    const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();

    const pokemonsWithDetails = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
            const detailsResponse = await fetch(pokemon.url);
            const details = await detailsResponse.json();

            const speciesResponse = await fetch(details.species.url);
            const species = await speciesResponse.json();
            const frenchName = species.names.find((name: { language: { name: string }; name: string }) => name.language.name === 'fr')?.name;

            return {
                id: details.id,
                nom: frenchName || details.name,
                sprite: details.sprites.other.showdown.front_default ? details.sprites.other.showdown.front_default : details.sprites.front_default,
                types: details.types.map((type: { type: { name: string } }) =>
                    type.type.name,
                )
            };
        })
    );

    return {
        pokemons: pokemonsWithDetails,
        page: page
    };
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const page = parseInt(context.query.page) || 1;
    const data = await getPokemonList(page);

    return {
        props: {
            pokemons: data.pokemons,
            page: data.page
        }
    };
}