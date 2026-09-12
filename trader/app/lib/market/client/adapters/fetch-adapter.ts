import type { HttpAdapter } from "./http-adapter";

import {
    MarketErrorAction,
    MarketErrorType,
    MarketHttpError,
} from "../../utils/errors";

export class FetchAdapter implements HttpAdapter {

    async request(
        input: RequestInfo | URL,
        init?: RequestInit,
    ): Promise<Response> {

        try {

            return await fetch(
                input,
                init,
            );

        } catch (error) {

            if (
                error instanceof DOMException &&
                error.name === "AbortError"
            ) {
                throw error;
            }

            throw new MarketHttpError({
                message: "Network request failed.",
                status: 0,
                url:
                    typeof input === "string"
                        ? input
                        : input instanceof URL
                            ? input.toString()
                            : input.url,
                type: MarketErrorType.NETWORK,
                action: MarketErrorAction.RETRY,
                cause: error,
            });

        }

    }

}