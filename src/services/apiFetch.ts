/**
 * A general-purpose wrapper for making API calls from the frontend.
 * Avoids repetition of base URL and error handling.
 */

/**
 * Makes an HTTP request to the specified API endpoint.
 * 
 * @param endpoint The API route to append to the base URL.
 * @param options Fetch options such as method, headers, body, etc.
 * @returns The API response parsed as JSON.
 * @throws Error if the API base URL is not defined or the request fails.
 */
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    // Read the base URL from environment variables
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) throw new Error("API base URL is not defined");

    // Make the fetch request
    const response = await fetch(`${baseUrl}${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    
    return response.json();
};