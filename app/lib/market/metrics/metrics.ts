import type {
    RequestExecution,
} from "../models/request-execution";

export interface MetricsCollector {

    recordRequest(
        execution: RequestExecution,
    ): void;

}

export class InMemoryMetricsCollector
    implements MetricsCollector {

    private readonly requests:
        RequestExecution[] = [];

    recordRequest(
        execution: RequestExecution,
    ): void {

        this.requests.push(
            execution,
        );

    }

    getRequests():
        readonly RequestExecution[] {

        return this.requests;

    }

    clear(): void {

        this.requests.length = 0;

    }

}