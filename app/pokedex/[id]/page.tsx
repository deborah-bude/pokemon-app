'use client';

import { getPokemonById } from '@/app/api/getPokemonId';
import { typeTranslations } from '@/app/features/ui/constant/typestranslation';
import { PokemonType } from '@/app/features/ui/types/typeTranslations.types';
import clsx from 'clsx';
import { ArrowLeft, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Pokemon {
    id: number;
    name: string;
    sprite: string;
    shinySprite: string;
  types: string[];
  height: number;
  weight: number;
  baseExp: number;
  cry: string | null;
  stats: { name: string; value: number }[];
  abilities: { name: string; isHidden: boolean }[];
  heldItems: string[];
  region: string;
  evolutionChain: string[];
  movesByMethod: Record<string, string[]>;
  order: number;
  isDefault: boolean;
}

const translateTypeName = (type: PokemonType): string => {
    return typeTranslations[type] || type;
  };

export default function PokemonPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (id) {
      getPokemonById(Number(id)).then((data) => {
        setPokemon(data);
        if (data.cry) {
          setAudio(new Audio(data.cry));
        }
      });
    }
  }, [id]);

  if (!pokemon) return <div className="text-center py-12">Chargement...</div>;

  const playCry = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#f2f9ff] via-[#fefeff] to-[#e6f3ff] text-gray-800">
      <div className="max-w-5xl mx-auto space-y-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
          <ArrowLeft size={16} />
          Retour
        </Link>

        {/* HEADER */}
        <div className="rounded-3xl bg-white/60 backdrop-blur-lg p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl">
          <Image
            src={pokemon.sprite}
            alt={pokemon.name}
            width={160}
            height={160}
            className="rounded-xl bg-white p-2"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold capitalize mb-3">{pokemon.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {pokemon.types.map((type, i) => (
                <span
                  key={i}
                  className={clsx(`px-3 py-1 rounded-full text-sm text-white font-medium shadow`, {
                    [`bg-${type}`]: type,
                  })}
                >
                  {translateTypeName(type as PokemonType)}
                </span>
              ))}
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow">
                Région : {pokemon.region}
              </span>
            </div>

            <div className="flex gap-6 text-sm text-gray-700 flex-wrap">
              <p><strong>Poids :</strong> {pokemon.weight} kg</p>
              <p><strong>Taille :</strong> {pokemon.height} m</p>
              <p><strong>Exp :</strong> {pokemon.baseExp}</p>
              {pokemon.cry && (
                <button
                  onClick={playCry}
                  className="inline-flex items-center gap-1 hover:text-blue-500"
                >
                  <Volume2 size={18} />
                  Cri
                </button>
              )}
            </div>
          </div>
        </div>

        {/* STATISTIQUES */}
        <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-md border border-white/30 shadow">
          <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {pokemon.stats.map((stat, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <span>{stat.name}</span>
                  <span>{stat.value}</span>
                </div>
                <div className="h-full w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(stat.value, 100)}%`,
                      backgroundColor: stat.value > 90 ? '#38bdf8' : stat.value > 60 ? '#60a5fa' : '#c084fc',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CAPACITÉS */}
        <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-md border border-white/30 shadow">
          <h2 className="text-xl font-semibold mb-4">Capacités</h2>
          <ul className="text-sm list-disc list-inside">
            {pokemon.abilities.map((a, i) => (
              <li key={i}>
                {a.name}
                {a.isHidden && <span className="text-xs text-gray-500 ml-2">(talent caché)</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* ÉVOLUTIONS */}
        {pokemon.evolutionChain.length > 1 && (
          <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-md border border-white/30 shadow">
            <h2 className="text-xl font-semibold mb-4">Évolutions</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              {pokemon.evolutionChain.map((name, i) => (
                <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full shadow">
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* OBJETS TENUS */}
        {pokemon.heldItems.length > 0 && (
          <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-md border border-white/30 shadow">
            <h2 className="text-xl font-semibold mb-4">Objets Tenus</h2>
            <ul className="text-sm list-disc list-inside">
              {pokemon.heldItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ATTAQUES */}
        <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-md border border-white/30 shadow space-y-6">
          <h2 className="text-xl font-semibold">Attaques</h2>
          {Object.entries(pokemon.movesByMethod).map(([method, moves]) => (
            <div key={method}>
              <h3 className="font-semibold capitalize mb-2 text-gray-700">{method.replace('_', ' ')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {moves.slice(0, 12).map((move, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 rounded-lg bg-white/40 hover:bg-white/70 transition shadow-sm"
                  >
                    {move}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
