export interface ProviderHealthSnapshot {

    healthy: boolean;

    lastSuccess?: Date;

    lastFailure?: Date;

    consecutiveFailures: number;

}

export class ProviderHealthMonitor {

    private healthy = true;

    private lastSuccess?: Date;

    private lastFailure?: Date;

    private consecutiveFailures = 0;

    recordSuccess(): void {

        this.healthy = true;

        this.consecutiveFailures = 0;

        this.lastSuccess = new Date();

    }

    recordFailure(): void {

        this.healthy = false;

        this.consecutiveFailures++;

        this.lastFailure = new Date();

    }

    getSnapshot(): ProviderHealthSnapshot {

        return {

            healthy: this.healthy,

            lastSuccess: this.lastSuccess,

            lastFailure: this.lastFailure,

            consecutiveFailures:
                this.consecutiveFailures,

        };

    }

}