'use client';

import { typeTranslations } from "@/app/features/ui/constant/typestranslation";
import { PokemonType } from "@/app/features/ui/types/typeTranslations.types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { CardPokemonProps } from "../types/cardPokemon.types";

const translateTypeName = (type: PokemonType): string => {
  return typeTranslations[type] || type;
};

const CardPokemon = ({ pokemon }: CardPokemonProps) => {
  return (
    <Link href={`/pokedex/${pokemon.id}`}>
      <div className={`rounded-3xl p-4 bg-type-gradient-${pokemon.types[0]} backdrop-blur-md shadow-lg transition-transform hover:scale-105`}>
          <span className="text-4xl font-bold text-white/60 absolute top-0 right-6">#{pokemon.id}</span>
          <Image
            src={pokemon.sprite}
            alt="Pokemon"
            height={100}
            width={100}
            className="h-20 w-auto mx-auto mb-2 drop-shadow-xl"
            unoptimized
          />
          <p className="text-center">{pokemon.name}</p>
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            {pokemon.types.map((type, i) => (
              <span
                key={i}
                className={clsx("px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm", {
                  [`bg-type-${type}`]: type
                })}
              >
                {translateTypeName(type as PokemonType)}
              </span>
            ))}
          </div>
      </div>
    </Link>
  );
};

export default CardPokemon;
