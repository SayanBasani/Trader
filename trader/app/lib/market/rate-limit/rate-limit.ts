export interface RateLimitInfo {

    limit?: number;

    remaining?: number;

    reset?: Date;

}

export interface RateLimitParser {

    parse(
        headers: Headers,
    ): RateLimitInfo;

}