/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './app/components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './app/features/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [
        {
            pattern: /bg-type-(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)/,
        },
        'bg-opacity-10',
        'hover:bg-opacity-30',
    ],
    theme: {
        extend: {
            colors: {
                pastelBlue: '#e0f2ff',
                pastelPink: '#ffe4f0',
                pastelPurple: '#f3e8ff',
                glassLight: 'rgba(255, 255, 255, 0.6)',
                borderGlass: 'rgba(255, 255, 255, 0.3)',
            },

            type: {
                normal: '#A8A77A',
                fire: '#EE8130',
                water: '#6390F0',
                electric: '#F7D02C',
                grass: '#7AC74C',
                ice: '#96D9D6',
                fighting: '#C22E28',
                poison: '#A33EA1',
                ground: '#E2BF65',
                flying: '#A98FF3',
                psychic: '#F95587',
                bug: '#A6B91A',
                rock: '#B6A136',
                ghost: '#735797',
                dragon: '#6F35FC',
                dark: '#705746',
                steel: '#B7B7CE',
                fairy: '#D685AD',
            },
        },
    },
}
