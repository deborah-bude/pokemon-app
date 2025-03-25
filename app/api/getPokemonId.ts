const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonById(id: number) {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${id}`);
        const details = await response.json();

        const speciesResponse = await fetch(details.species.url);
        const species = await speciesResponse.json();

        const evolutionUrl = species.evolution_chain.url;
        const evolutionResponse = await fetch(evolutionUrl);
        const evolutionData = await evolutionResponse.json();

        const frenchName = species.names.find(
            (name: { language: { name: string }; name: string }) => name.language.name === 'fr'
        )?.name;

        const region = species.generation.name.replace('generation-', '').toUpperCase(); // e.g. "kanto"

        const getEvolutionChain = (chain: any) => {
            const evolutions = [];
            let current = chain;
            while (current) {
                evolutions.push(current.species.name);
                if (current.evolves_to.length > 0) {
                    current = current.evolves_to[0];
                } else {
                    break;
                }
            }
            return evolutions;
        };

        // Classer les attaques par méthode d'apprentissage
        const movesByMethod: Record<string, string[]> = {
            level_up: [],
            machine: [],
            egg: [],
            tutor: [],
        };

        for (const move of details.moves) {
            const methods = move.version_group_details.map((d: any) => d.move_learn_method.name);
            for (const method of methods) {
                if (movesByMethod[method]) {
                    if (!movesByMethod[method].includes(move.move.name)) {
                        movesByMethod[method].push(move.move.name);
                    }
                }
            }
        }

        return {
            id: details.id,
            name: frenchName || details.name,
            sprite: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
            shinySprite: details.sprites.other['official-artwork'].front_shiny || details.sprites.front_shiny,
            types: details.types.map((t: any) => t.type.name),
            height: details.height / 10,
            weight: details.weight / 10,
            baseExp: details.base_experience,
            cry: details.cries?.latest || null,

            stats: details.stats.map((s: any) => ({
                name: s.stat.name,
                value: s.base_stat,
            })),

            abilities: details.abilities.map((a: any) => ({
                name: a.ability.name,
                isHidden: a.is_hidden,
            })),

            heldItems: details.held_items.map((item: any) => item.item.name),

            region,
            evolutionChain: getEvolutionChain(evolutionData.chain),

            movesByMethod,
            order: details.order,
            isDefault: details.is_default,
        };
    } catch (error) {
        console.error(`Erreur lors de la récupération du Pokémon ${id} :`, error);
        throw error;
    }
}
