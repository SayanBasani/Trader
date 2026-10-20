import {
    CircuitBreakerState,
    type CircuitBreakerConfig,
} from "./circuit-breaker.types";

import {
    CircuitBreakerPolicy,
} from "./circuit-breaker-policy";

export class CircuitBreaker {

    private state =
        CircuitBreakerState.CLOSED;

    private failures = 0;

    private openedAt = 0;

    protected readonly policy: CircuitBreakerPolicy;

    constructor(
        config: CircuitBreakerConfig,
    ) {

        this.policy =
            new CircuitBreakerPolicy(
                config,
            );

    }

    getState(): CircuitBreakerState {

        return this.state;

    }

}