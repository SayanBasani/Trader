export interface MarketStatus {
    exchange: string;

    isOpen: boolean;

    timezone: string;

    currentTime: string;

    nextOpen: string;

    nextClose: string;
}