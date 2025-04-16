import { MoveWithDetailsType } from "./types/moves.types";

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getMovesList(page = 1): Promise<{ moves: MoveWithDetailsType[], page: number }> {
    const limit = 20;
    const offset = (page - 1) * limit;

    const response = await fetch(`${BASE_URL}/move?offset=${offset}&limit=${limit}`);
    const data = await response.json();

    // const movesWithDetails: MoveWithDetailsType[] = await Promise.all(
    //     data.results.map(async (attaque: { url: string }) => {
    //         const detailsResponse = await fetch(attaque.url);
    //         const details: MoveType = await detailsResponse.json();
    //         const frenchName = details.names.find((name: { language: { name: string }, name: string }) => name.language.name === 'fr')?.name;
    //         const frenchDescription = details.flavor_text_entries.find((entry: { language: { name: string }, flavor_text: string }) => entry.language.name === 'fr')?.flavor_text;
    //         return {
    //             id: details.id,
    //             nom: frenchName || details.name,
    //             type: typeTranslations[details.type.name] || details.type.name,
    //             puissance: details.power || '---',
    //             precision: details.accuracy || '---',
    //             description: frenchDescription,
    //         };
    //     })
    // );

    return {
        data: data.results,
    };
}