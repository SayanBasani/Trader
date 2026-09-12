export interface ProviderStatisticsSnapshot {

    totalRequests: number;

    successfulRequests: number;

    failedRequests: number;

    averageResponseTime: number;

    fastestResponseTime?: number;

    slowestResponseTime?: number;

}

export class ProviderStatistics {

    private totalRequests = 0;

    private successfulRequests = 0;

    private failedRequests = 0;

    private totalResponseTime = 0;

    private fastestResponseTime?: number;

    private slowestResponseTime?: number;

    recordSuccess(
        duration: number,
    ): void {

        this.totalRequests++;

        this.successfulRequests++;

        this.recordDuration(duration);

    }

    recordFailure(
        duration: number,
    ): void {

        this.totalRequests++;

        this.failedRequests++;

        this.recordDuration(duration);

    }

    private recordDuration(
        duration: number,
    ): void {

        this.totalResponseTime += duration;

        if (
            this.fastestResponseTime === undefined ||
            duration < this.fastestResponseTime
        ) {

            this.fastestResponseTime = duration;

        }

        if (
            this.slowestResponseTime === undefined ||
            duration > this.slowestResponseTime
        ) {

            this.slowestResponseTime = duration;

        }

    }

    getSnapshot(): ProviderStatisticsSnapshot {

        return {

            totalRequests: this.totalRequests,

            successfulRequests: this.successfulRequests,

            failedRequests: this.failedRequests,

            averageResponseTime:
                this.totalRequests === 0
                    ? 0
                    : this.totalResponseTime /
                      this.totalRequests,

            fastestResponseTime:
                this.fastestResponseTime,

            slowestResponseTime:
                this.slowestResponseTime,

        };

    }

}