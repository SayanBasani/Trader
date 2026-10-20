import { MarketHttpError } from "../utils/errors";

export interface ProviderResponseValidator<T = unknown> {

    validate(data: T): void;
}