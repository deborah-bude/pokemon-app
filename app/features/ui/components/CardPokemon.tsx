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
    <Link href={`/pokedex/${pokemon.id}`} legacyBehavior>
      <div className={clsx(
        "rounded-3xl p-4 bg-white/60 backdrop-blur-md shadow-lg border border-white/40 transition-transform hover:scale-105",
        {
          [`bg-${pokemon.types[0]}`]: pokemon.types[0]
        }
      )}>
        <div className="flex flex-col items-center text-center">
          <span className="text-lg font-bold text-gray-800">#{pokemon.id}</span>
          <Image
            src={pokemon.sprite}
            alt="Pokemon"
            height={100}
            width={100}
            className="h-20 w-auto mb-2 drop-shadow-xl"
            unoptimized
          />
          <p className="text-lg font-bold text-gray-800">{pokemon.name}</p>
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            {pokemon.types.map((type, i) => (
              <span
                key={i}
                className={clsx("px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm", {
                  [`bg-${type}`]: type
                })}
              >
                {translateTypeName(type as PokemonType)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardPokemon;
