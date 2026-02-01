import { FileSpreadsheet } from "lucide-react";
import { CircleGauge, ArrowBigUpDash } from "lucide-react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

import { Miner } from "@/types/Miner";
import { formatHashPower } from "@/helpers/formatters";

interface MinerCardProps {
    miner: Miner;
}

export const MinerCard = ({ miner }: MinerCardProps) => {
    const data = Object.entries(miner.categories).map(([cat, d]) => ({
        category: cat,
        power: d.power,
        bonus: d.bonus,
    }));

    return (
        <div className="rounded border-primary p-4 px-8 flex gap-8">
            <div className="flex-1 flex flex-col items-center justify-center">
                <h3 className="w-full font-bold text-lg text-white mb-1">{miner.name}</h3>
                {miner.imageUrl && (
                    <div className="w-full bg-primary rounded mb-2 px-2 py-1 flex justify-center">
                        <img src={miner.imageUrl} alt={miner.name} />
                    </div>
                )}
                <div className="w-full text-white flex flex-col gap-1">
                    <div className="rounded bg-primary p-2 flex gap-2 items-center">
                        <FileSpreadsheet className="text-rare" size={18} />
                        <p className="font-bold">Characteristics</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="flex-1 text-sm rounded bg-primary p-2">Cell(s)</p>
                        <p className="flex-2 text-sm rounded bg-primary p-2">{miner.cells}</p>
                    </div>
                    <div className="flex gap-1 mt-1 text-center">
                        <p className={`flex-1 text-sm rounded bg-primary p-2 py-1 bg-${miner.sellable}`}>Sellable</p>
                        <p className={`flex-1 text-sm rounded bg-primary p-2 py-1 bg-${miner.mergeable}`}>Mergeable</p>
                    </div>
                </div>
            </div>

            <div className="flex-3 flex flex-col gap-1 justify-center">
                <div className="grid grid-cols-[50px_1fr_1fr] text-sm font-bold text-white p-2 gap-1 text-center">
                    <span></span>
                    <span className="rounded bg-primary px-2 py-1">Power</span>
                    <span className="rounded bg-primary px-2 py-1">Bonus</span>
                </div>
                {Object.entries(miner.categories).map(([cat, data], index, arr) => {
                    let powerDiff: string | null = null;
                    let bonusDiff: string | null = null;

                    if (index > 0) {
                        const prev = arr[index - 1][1];
                        powerDiff = "+" + (((data.power - prev.power) / prev.power) * 100).toFixed(1) + "%";
                        bonusDiff = "+" + (((data.bonus - prev.bonus) / prev.bonus) * 100).toFixed(1) + "%";
                    }

                    return (
                        <div key={cat} className="flex flex-col">
                            <div className="grid grid-cols-[50px_1fr_1fr] text-sm text-white bg-secondary rounded px-2 gap-1">
                                <div className="flex py-1">
                                    <img src={`/images/miner-categories/${cat}.png`} alt={cat} className="h-[18px]" />
                                </div>
                                <span className="flex justify-between gap-1 px-4 py-1 rounded bg-primary">
                                    {formatHashPower(data.power)}
                                    {index > 0 && (
                                        <span className="text-xs text-green-400">({powerDiff})</span>
                                    )}
                                </span>
                                <span className="flex justify-between gap-1 px-10 py-1 rounded bg-primary">
                                    {data.bonus}%
                                    {index > 0 && (
                                        <span className="text-xs text-green-400">({bonusDiff})</span>
                                    )}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex-2 flex flex-col gap-1 justify-center">
                <div className="rounded bg-primary p-2 flex gap-2 items-center">
                    <CircleGauge className="text-rare" size={14} />
                    <p className="text-white text-sm font-bold">Power</p>
                </div>
                <div className="bg-primary p-2 rounded text-xs">
                    <ResponsiveContainer width={300} height={100}>
                        <LineChart data={data}>
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="power"
                            stroke="#03E1E4"
                            strokeWidth={0.5}
                            strokeDasharray="3 3"
                            name="Power"
                        />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded bg-primary p-2 flex gap-2 items-center">
                    <ArrowBigUpDash className="text-rare" size={14} />
                    <p className="text-white text-sm font-bold">Bonus</p>
                </div>
                <div className="bg-primary p-2 rounded text-xs">
                    <ResponsiveContainer width={300} height={100}>
                        <LineChart data={data}>
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="bonus"
                            stroke="#03E1E4"
                            strokeWidth={0.5}
                            strokeDasharray="3 3"
                            name="Bonus"
                        />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
