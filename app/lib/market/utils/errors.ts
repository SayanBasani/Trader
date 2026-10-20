export enum MarketErrorType {
    CLIENT = "CLIENT",

    AUTH = "AUTH",

    RATE_LIMIT = "RATE_LIMIT",

    SERVER = "SERVER",

    NETWORK = "NETWORK",

    TIMEOUT = "TIMEOUT",

    UNKNOWN = "UNKNOWN",
}

export enum MarketErrorAction {
    NONE = "NONE",

    RETRY = "RETRY",

    FAILOVER = "FAILOVER",

    STOP = "STOP",
}

export class MarketHttpError extends Error {
    readonly status: number;

    readonly url: string;

    readonly type: MarketErrorType;

    readonly action: MarketErrorAction;

    readonly cause?: unknown;

    constructor(options: {
        message: string;
        status: number;
        url: string;
        type: MarketErrorType;
        action: MarketErrorAction;
        cause?: unknown;
    }) {
        super(options.message);

        this.name = "MarketHttpError";

        this.status = options.status;

        this.url = options.url;

        this.type = options.type;

        this.action = options.action;

        this.cause = options.cause;
    }
}