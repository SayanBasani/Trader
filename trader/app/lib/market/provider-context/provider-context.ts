import {
    CircuitBreaker,
} from "../circuit-breaker";

import {
    ProviderHealthMonitor,
} from "../provider-health";

import {
    ProviderStatistics,
} from "../provider-statistics";

export class ProviderContext {

    readonly breaker: CircuitBreaker;

    readonly health: ProviderHealthMonitor;

    readonly statistics: ProviderStatistics;

    constructor(
        breaker: CircuitBreaker,
        health: ProviderHealthMonitor,
        statistics: ProviderStatistics,
    ) {

        this.breaker = breaker;

        this.health = health;

        this.statistics = statistics;

    }

}