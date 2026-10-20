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
                    this.sanitizeUrl(
                        this.getUrl(
                            input,
                        ),
                    ),
                type: MarketErrorType.NETWORK,
                action: MarketErrorAction.RETRY,
                cause: error,
            });

        }

    }

    private getUrl(
        input: RequestInfo | URL,
    ): string {
        if (
            typeof input === "string"
        ) {
            return input;
        }

        if (
            input instanceof URL
        ) {
            return input.toString();
        }

        return input.url;
    }

    private sanitizeUrl(
        rawUrl: string,
    ): string {
        try {

            const url =
                new URL(rawUrl);

            const sensitiveParameters = [
                "token",
                "apikey",
                "api_key",
                "key",
                "access_token",
                "secret",
            ];

            for (
                const parameter
                of sensitiveParameters
            ) {
                if (
                    url.searchParams.has(
                        parameter,
                    )
                ) {
                    url.searchParams.set(
                        parameter,
                        "[REDACTED]",
                    );
                }
            }

            return url.toString();

        } catch {
            return "[INVALID_URL]";
        }
    }

}