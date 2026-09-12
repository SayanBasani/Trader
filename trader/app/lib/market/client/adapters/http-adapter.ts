export interface HttpAdapter {
    request(
        input: RequestInfo | URL,
        init?: RequestInit,
    ): Promise<Response>;
}