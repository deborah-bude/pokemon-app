import { PokemonType } from "../types/typeTranslations.types";

const typeTranslations: { [key in PokemonType]: string } = {
    normal: 'Normal',
    fire: 'Feu',
    water: 'Eau',
    electric: 'Électrique',
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

export { typeTranslations };

