import { refreshAccessToken } from "./refreshAccessToken.js";

async function api(url, options = {}) {
    let access = localStorage.getItem("access");

    let response = await fetch(url, 
        {   ...options,
            headers: { 
                ...options.headers,
                Authorization: `Bearer ${access}`
            }
        });

    if(response.status === 401){

        access = await refreshAccessToken();

        if (!access) {

            localStorage.removeItem( "access");

            localStorage.removeItem( "refresh");

            localStorage.removeItem("user" );

            window.location = "/auth.php";

            return null;
        }

        response =
            await fetch(url, {
                ...options,

                headers: {
                    ...options.headers,

                    Authorization:
                        `Bearer ${access}`
                }
            });
    }

    return response;
}