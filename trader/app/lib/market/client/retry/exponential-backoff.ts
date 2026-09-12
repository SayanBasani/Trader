import type { RetryConfig } from "../http-client.types";

import type { RetryPolicy } from "./retry-policy";

import {
    MarketErrorAction,
    MarketHttpError,
} from "../../utils/errors";

export class ExponentialBackoffPolicy
    implements RetryPolicy {

    constructor(
        private readonly config: RetryConfig,
    ) {}

    shouldRetry(
        error: MarketHttpError,
        attempt: number,
    ): boolean {

        if (!this.config.enabled) {
            return false;
        }

        if (
            error.action !==
            MarketErrorAction.RETRY
        ) {
            return false;
        }

        return (
            attempt <
            this.config.maxAttempts
        );
    }

    getDelay(
        attempt: number,
    ): number {

        return (
            this.config.baseDelay *
            Math.pow(2, attempt - 1)
        );
    }
}