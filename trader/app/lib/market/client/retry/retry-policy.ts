import type { MarketHttpError } from "../../utils/errors";

export interface RetryPolicy {
    shouldRetry(
        error: MarketHttpError,
        attempt: number,
    ): boolean;

    getDelay(
        attempt: number,
    ): number;
}