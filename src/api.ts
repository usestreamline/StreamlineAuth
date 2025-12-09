export const API_BASE_URL = "https://api.usestreamline.net/v1";

export function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
}

export function buildAuthHeaders(additional?: HeadersInit): HeadersInit {
    const headers = new Headers(additional || {});
    const csrf = getCookie("csrfToken");

    if (csrf) {
        headers.set("X-CSRF-Token", csrf);
    }

    return headers;
}
