/**
 * This file defines function helpers for all kind of formatting across the frontend.
 */

/**
 * Format hash power to the largest possible unit.
 * 
 * @param hashPower Hash power in Gh/s.
 * @returns String with number + unit.
 */
export function formatHashPower(hashPower: number): string {
    const units = ["Gh/s", "Th/s", "Ph/s", "Eh/s", "Zh/s"];
    let value = hashPower;
    let unitIndex = 0;

    // Convert up to the largest unit
    while (unitIndex < units.length - 1 && value >= 1000) {
        value /= 1000;
        unitIndex++;
    }

    // Round to 3 decimals
    return `${value.toFixed(3)} ${units[unitIndex]}`;
};