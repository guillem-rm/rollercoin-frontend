"use client";

import { useEffect, useState } from "react";
import { Pickaxe, SearchX } from "lucide-react";

import { getMinerScraperStatus, getAllMiners, getMinersByName } from "@/services/minersService";
import { Miner } from "@/types/Miner";
import { MinerCard } from "@/components/MinerCard";
import { LoadingProgress } from "@/components/LoadingProgress";
import { PageTitle } from "@/components/PageTitle";

export default function MinersPage() {
    const [miners, setMiners] = useState<Miner[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState<number | null>(null);

    const [searchByName, setSearchByName] = useState<string>("");

    // Polling to check scraper status and fetch miners when done
    useEffect(() => {
        /**
         * Poll scraper status and fetch miners when completed
         */
        const poll = async () => {
            try {
                // Check scraper status
                const state = await getMinerScraperStatus();
                setProgress(state.progress);

                // If not running, fetch miners and stop loading. Otherwise, poll again after delay.
                if (!state.running) {
                    const minersData = await getAllMiners();
                    setMiners(minersData);
                    setLoading(false);
                } else {
                    setTimeout(poll, 1000);
                }
            } 
            catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        // Start
        poll();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            try {
                let minersData: any[] = [];
                if (searchByName === "") {
                    minersData = await getAllMiners();
                } else {
                    minersData = await getMinersByName(searchByName);
                }
                setMiners(minersData);
            }
            catch (err) {
                console.error(err);
            }
        };

        fetch();
    }, [searchByName])

    return (
        <div className="h-full flex flex-col">
            <PageTitle title="Miners" description="Here you can find all miners stored on the database" />
            <div className="flex-1 bg-secondary p-6 rounded-sm border-primary overflow-auto">
                <div className="mb-4">
                    <div className="rounded bg-primary flex gap-4 p-4 border-primary-2 w-fit items-center">
                        <Pickaxe className="text-rare" size={60} />
                        <p className="text-white flex flex-col text-lg">
                            Miners
                            <span className="font-bold text-2xl leading-none">{miners.length}</span>
                        </p>
                    </div>
                </div>

                <div className="mb-4">
                    <input 
                        type="text" 
                        className="rounded bg-primary border-primary text-white text-sm px-3 py-[6px] w-[300px]" 
                        placeholder="Search..."
                        value={searchByName}
                        onChange={(e) => setSearchByName(e.target.value)}
                    ></input>
                </div>

                {loading ? (
                    <LoadingProgress title="Scraping miners..." progress={progress} />
                ) : (
                    <div className="flex flex-col gap-4">
                        {miners.length === 0 ? (
                            <div className="flex flex-col gap-2 justify-center items-center text-gray-500">
                                <SearchX size={80} />
                                <p>No miners found in the database.</p>
                            </div>
                        ) : (
                            miners.map((miner) => (
                                <MinerCard key={miner.name} miner={miner} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}