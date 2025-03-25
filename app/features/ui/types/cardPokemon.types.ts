
type CardPokemonProps = {
    pokemon: {
        id: number;
        name: string;
        sprite: string;
        spriteShiny: string;
        types: string[];
        height: number;
        weight: number;
        baseExp: number;
        cry: string | null;
        stats: { name: string; value: number }[];
        abilities: { name: string; isHidden: boolean }[];
        heldItems: string[];
        moves: string[];
        order: number;
    };
};

export type { CardPokemonProps };

