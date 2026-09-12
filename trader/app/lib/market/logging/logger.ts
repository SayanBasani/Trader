import type {
    RequestExecution,
} from "../models/request-execution";

export interface Logger {

    log(
        execution: RequestExecution,
    ): void;

}

export class ConsoleLogger
    implements Logger {

    log(
        execution: RequestExecution,
    ): void {

        console.info(
            "[HTTP]",
            execution.method,
            execution.url,
            `Status=${execution.status}`,
            `Duration=${execution.duration}ms`,
            `Success=${execution.success}`,
        );

    }

}