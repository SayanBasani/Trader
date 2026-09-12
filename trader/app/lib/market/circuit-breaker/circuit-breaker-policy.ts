import type {
    CircuitBreakerConfig,
} from "./circuit-breaker.types";

export class CircuitBreakerPolicy {

    constructor(
        private readonly config: CircuitBreakerConfig,
    ) {}

    shouldOpen(
        failures: number,
    ): boolean {

        return (
            failures >=
            this.config.failureThreshold
        );

    }

    shouldAttemptRecovery(
        openedAt: number,
    ): boolean {

        return (
            Date.now() - openedAt >=
            this.config.recoveryTimeout
        );

    }

}