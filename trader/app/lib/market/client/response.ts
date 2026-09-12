import type {
    RateLimitInfo,
} from "../rate-limit";

export interface HttpResponse<T> {

    status: number;

    ok: boolean;

    headers: Headers;

    data: T;

    rateLimit?: RateLimitInfo;

}