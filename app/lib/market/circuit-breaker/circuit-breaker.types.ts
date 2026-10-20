export enum CircuitBreakerState {
    CLOSED = "CLOSED",

    OPEN = "OPEN",

    HALF_OPEN = "HALF_OPEN",
}

export interface CircuitBreakerConfig {
    enabled: boolean;

    failureThreshold: number;

    recoveryTimeout: number;

    halfOpenMaxRequests: number;
}
