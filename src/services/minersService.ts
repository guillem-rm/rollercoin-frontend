import { apiFetch } from "./apiFetch";
import { Miner } from "@/types/Miner";

const ENDPOINT_BASE = "miners";

/**
 * Service to get the status of the miner scraper.
 * 
 * @returns The scraper status including whether it's running and the progress percentage.
 */
export const getMinerScraperStatus = async () => {
    return apiFetch(`${ENDPOINT_BASE}/scrape/status`);
};

/**
 * Service to get all miners.
 * 
 * @returns The list of all miners.
 */
export const getAllMiners = async (): Promise<Miner[]> => {
    return apiFetch(ENDPOINT_BASE);
};

/**
 * Service to get miners by name.
 * 
 * @param minerName Name of the miner
 * @returns The list of miners.
 */
export const getMinersByName = async (minerName: string): Promise<Miner[]> => {
    return apiFetch(`${ENDPOINT_BASE}/name/${minerName}`);
};