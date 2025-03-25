'use client';

import Image from 'next/image';
import RandomPokemon from './features/pages/home/components/RandomPokemon';
import { Card, CardContent, CardHeader, CardTitle } from './features/ui/components/Card';

const Home = () => {
  return (
    <main className="container mx-auto my-8 px-4 min-h-screen overflow-x-hidden">
      {/* ZONE PRINCIPALE */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BLOC IMAGE OU CONTENU PRINCIPAL */}
        <div className="lg:col-span-2 rounded-3xl bg-white/60 border border-white/30 backdrop-blur-xl p-4 shadow-xl relative group hover:scale-[1.01] transition-transform duration-300">
          <Image
            src="/sample-pokemon.jpg" // mets une vraie image ici
            alt="Featured Pokemon"
            width={800}
            height={400}
            className="w-full h-auto rounded-2xl object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white bg-black/40 px-4 py-2 rounded-xl font-bold text-lg">
            Attrapez-les tous !
          </div>
        </div>

        {/* STATS OU WIDGETS */}
        <aside className="flex flex-col gap-4">
          <RandomPokemon />

          <Card className="bg-white/60 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle>Simulateur d&apos;équipe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Essayez vos Team pokemons ! Force, faiblesse, puissance, etc. vous pourrez voir les statistiques générales de votre team avant de la jouer.</p>
            </CardContent>
          </Card>
        </aside>
      </section>

      {/* SECTION POKÉMON FAVORIS */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">✨ Pokémon Favoris</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {[1, 2, 3,4,5].map((i) => (
            <div key={i} className="min-w-[200px] bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform">
              <Image
                src={`/pokemon/favorite-${i}.png`}
                alt={`Favori ${i}`}
                width={150}
                height={150}
                className="mx-auto drop-shadow"
              />
              <p className="text-center mt-2 font-semibold">Pokémon #{i}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
