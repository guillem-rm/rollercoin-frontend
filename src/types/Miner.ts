interface MinerCategory {
    power: number;
    bonus: number;
    price: number;
}

export interface Miner {
    id?: number;
    name: string;
    imageUrl: string;
    cells: 1 | 2;
    sellable: boolean;
    mergeable: boolean;
    categories: Record<string, MinerCategory>;
}