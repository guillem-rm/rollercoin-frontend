"use client";

import { useEffect, useState } from "react";

import { getAllMiners, getMinerScraperStatus } from "@/services/minersService";
import { Miner } from "@/types/Miner";
import { MinerCard } from "@/components/MinerCard";
import { LoadingProgress } from "@/components/LoadingProgress";
import { PageTitle } from "@/components/PageTitle";

export default function MinersPage() {
    const [miners, setMiners] = useState<Miner[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState<number | null>(null);

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
                    setTimeout(poll, 2000);
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

    return (
        <div className="h-full flex flex-col">
            <PageTitle title="Miners" description="Here you can find all miners stored on the database" />
            <div className="flex-1 bg-secondary p-6 rounded-sm border-primary overflow-auto">
                {loading ? (
                    <LoadingProgress title="Scraping miners..." progress={progress} />
                ) : (
                    <div className="flex flex-col gap-4">
                        {miners.map((miner) => (
                            <MinerCard key={miner.name} miner={miner} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}