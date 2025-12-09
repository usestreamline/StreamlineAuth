import { API_BASE_URL, buildAuthHeaders } from "./api";

export async function authFetch(
    path: string,
    options: RequestInit = {}
): Promise<Response> {
    const headers = buildAuthHeaders(options.headers);

    return fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
        credentials: "include",
    });
}

export function publicFetch(
    path: string,
    options: RequestInit = {}
): Promise<Response> {
    return fetch(`${API_BASE_URL}${path}`, {
        ...options,
        credentials: "include", // optional
    });
}
