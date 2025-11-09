import { Miner } from "@/types/Miner";

interface MinerCardProps {
    miner: Miner;
}

export const MinerCard = ({ miner }: MinerCardProps) => (
    <div className="rounded border-primary p-4 flex gap-10">
        <div className="flex-1 flex flex-col items-center">
            <div className="bg-primary rounded mb-2 p-2">
                <img src={miner.imageUrl} alt={miner.name} />
            </div>
            <h3 className="font-bold text-lg mb-1">{miner.name}</h3>
            <p className="text-sm mb-1">Cells: {miner.cells}</p>
            <p className="text-sm mb-2">
                {miner.sellable ? "Sellable" : ""} {miner.mergeable ? "Mergeable" : ""}
            </p>
        </div>
        <div className="flex-4 flex gap-4">
            {Object.entries(miner.categories).map(([cat, data]) => (
                <div key={cat} className="flex flex-col justify-center text-sm">
                    <span className={`text-${cat} font-bold`}>{cat}</span>
                    <span>Power: {data.power}</span>
                    <span>Bonus: {data.bonus}%</span>
                </div>
            ))}
        </div>
    </div>
);
