
interface Move {
    id: number;
    name: string;
    type: { name: string };
    power: number | null;
    accuracy: number | null;
    names: {
        language: { name: string };
        name: string;
    }[];
    flavor_text_entries: {
        language: { name: string };
        flavor_text: string;
    }[];
}

interface MoveWithDetails {
    id: number;
    nom: string;
    type: string;
    puissance: number | string;
    precision: number | string;
    description: string | undefined;
}

export type MoveType = Move;
export type MoveWithDetailsType = MoveWithDetails;