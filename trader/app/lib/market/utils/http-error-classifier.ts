import {
    MarketErrorAction,
    MarketErrorType,
} from "@/lib/market/utils/errors";

export interface HttpErrorClassification {
    type: MarketErrorType;
    action: MarketErrorAction;
}

export function classifyHttpError(
    status: number,
): HttpErrorClassification {

    switch (status) {

        case 400:
        case 404:
            return {
                type: MarketErrorType.CLIENT,
                action: MarketErrorAction.STOP,
            };

        case 401:
        case 403:
            return {
                type: MarketErrorType.AUTH,
                action: MarketErrorAction.FAILOVER,
            };

        case 402:
            return {
                type: MarketErrorType.UNKNOWN,
                action: MarketErrorAction.FAILOVER,
            };

        case 408:
            return {
                type: MarketErrorType.TIMEOUT,
                action: MarketErrorAction.RETRY,
            };

        case 429:
            return {
                type: MarketErrorType.RATE_LIMIT,
                action: MarketErrorAction.FAILOVER,
            };

        default:

            if (status >= 500) {
                return {
                    type: MarketErrorType.SERVER,
                    action: MarketErrorAction.RETRY,
                };
            }

            return {
                type: MarketErrorType.UNKNOWN,
                action: MarketErrorAction.STOP,
            };
    }
}