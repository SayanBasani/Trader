import { API_BASE_URL } from "./config";

async function refreshAccessToken() {

    const refresh = localStorage.getItem("refresh");
    if (!refresh) { return null; }
    const response = await fetch(
            `${API_BASE_URL}/token/refresh/`,
            {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({refresh})
            }
        );
    if (!response.ok) { return null; }
    
    const data = await response.json();

     if (data.access) {

        localStorage.setItem(
            "access",
            data.access
        );

        if (data.refresh) {
            localStorage.setItem(
                "refresh",
                data.refresh
            );
        }

        return data.access;
    }

    return null;
}