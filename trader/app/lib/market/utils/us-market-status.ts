import type { MarketStatus } from "@/lib/market/types";

const MARKET_TIMEZONE = "America/New_York";

const MARKET_OPEN_MINUTES = 9 * 60 + 30;
const MARKET_CLOSE_MINUTES = 16 * 60;

function getEasternParts(date: Date) {
    const formatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: MARKET_TIMEZONE,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            },
        );

    const parts =
        formatter.formatToParts(date);

    const get =
        (type: string) =>
            parts.find(
                (part) =>
                    part.type === type,
            )?.value ?? "";

    return {
        year: Number(get("year")),
        month: Number(get("month")),
        day: Number(get("day")),
        weekday: get("weekday"),
        hour: Number(get("hour")),
        minute: Number(get("minute")),
        second: Number(get("second")),
    };
}

function getDateKey(
    year: number,
    month: number,
    day: number,
): string {
    return [
        year,
        String(month).padStart(2, "0"),
        String(day).padStart(2, "0"),
    ].join("-");
}

function getNthWeekdayOfMonth(
    year: number,
    month: number,
    weekday: number,
    occurrence: number,
): number {
    const firstDay =
        new Date(
            Date.UTC(
                year,
                month - 1,
                1,
            ),
        ).getUTCDay();

    return (
        1 +
        (
            (weekday - firstDay + 7) %
            7
        ) +
        (occurrence - 1) * 7
    );
}

function getLastWeekdayOfMonth(
    year: number,
    month: number,
    weekday: number,
): number {
    const lastDay =
        new Date(
            Date.UTC(
                year,
                month,
                0,
            ),
        );

    const lastDate =
        lastDay.getUTCDate();

    const lastWeekday =
        lastDay.getUTCDay();

    return (
        lastDate -
        (
            (lastWeekday - weekday + 7) %
            7
        )
    );
}

function getObservedDate(
    year: number,
    month: number,
    day: number,
): string {
    const date =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day,
            ),
        );

    const weekday =
        date.getUTCDay();

    let observedDay = day;
    let observedMonth = month;
    let observedYear = year;

    if (weekday === 6) {
        const previousDay =
            new Date(
                Date.UTC(
                    year,
                    month - 1,
                    day - 1,
                ),
            );

        observedDay =
            previousDay.getUTCDate();

        observedMonth =
            previousDay.getUTCMonth() + 1;

        observedYear =
            previousDay.getUTCFullYear();
    }

    if (weekday === 0) {
        const nextDay =
            new Date(
                Date.UTC(
                    year,
                    month - 1,
                    day + 1,
                ),
            );

        observedDay =
            nextDay.getUTCDate();

        observedMonth =
            nextDay.getUTCMonth() + 1;

        observedYear =
            nextDay.getUTCFullYear();
    }

    return getDateKey(
        observedYear,
        observedMonth,
        observedDay,
    );
}

function getGoodFriday(
    year: number,
): string {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor(
        (b + 8) / 25,
    );
    const g = Math.floor(
        (b - f + 1) / 3,
    );
    const h =
        (
            19 * a +
            b -
            d -
            g +
            15
        ) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l =
        (
            32 +
            2 * e +
            2 * i -
            h -
            k
        ) % 7;
    const m = Math.floor(
        (
            a +
            11 * h +
            22 * l
        ) / 451,
    );

    const month =
        Math.floor(
            (
                h +
                l -
                7 * m +
                114
            ) / 31,
        );

    const day =
        (
            (
                h +
                l -
                7 * m +
                114
            ) %
            31
        ) + 1;

    const easter =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day,
            ),
        );

    easter.setUTCDate(
        easter.getUTCDate() - 2,
    );

    return getDateKey(
        easter.getUTCFullYear(),
        easter.getUTCMonth() + 1,
        easter.getUTCDate(),
    );
}

function getMarketHolidays(
    year: number,
): Set<string> {
    const holidays =
        new Set<string>();

    // New Year's Day
    holidays.add(
        getObservedDate(
            year,
            1,
            1,
        ),
    );

    // Martin Luther King Jr. Day
    holidays.add(
        getDateKey(
            year,
            1,
            getNthWeekdayOfMonth(
                year,
                1,
                1,
                3,
            ),
        ),
    );

    // Presidents' Day
    holidays.add(
        getDateKey(
            year,
            2,
            getNthWeekdayOfMonth(
                year,
                2,
                1,
                3,
            ),
        ),
    );

    // Good Friday
    holidays.add(
        getGoodFriday(year),
    );

    // Memorial Day
    holidays.add(
        getDateKey(
            year,
            5,
            getLastWeekdayOfMonth(
                year,
                5,
                1,
            ),
        ),
    );

    // Juneteenth
    holidays.add(
        getObservedDate(
            year,
            6,
            19,
        ),
    );

    // Independence Day
    holidays.add(
        getObservedDate(
            year,
            7,
            4,
        ),
    );

    // Labor Day
    holidays.add(
        getDateKey(
            year,
            9,
            getNthWeekdayOfMonth(
                year,
                9,
                1,
                1,
            ),
        ),
    );

    // Thanksgiving
    holidays.add(
        getDateKey(
            year,
            11,
            getNthWeekdayOfMonth(
                year,
                11,
                4,
                4,
            ),
        ),
    );

    // Christmas
    holidays.add(
        getObservedDate(
            year,
            12,
            25,
        ),
    );

    return holidays;
}

function isTradingDay(
    year: number,
    month: number,
    day: number,
): boolean {
    const date =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day,
            ),
        );

    const weekday =
        date.getUTCDay();

    if (
        weekday === 0 ||
        weekday === 6
    ) {
        return false;
    }

    const dateKey =
        getDateKey(
            year,
            month,
            day,
        );

    return !getMarketHolidays(
        year,
    ).has(dateKey);
}

function getTimeZoneOffsetMs(
    date: Date,
): number {
    const formatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone:
                    MARKET_TIMEZONE,
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            },
        );

    const parts =
        formatter.formatToParts(date);

    const get =
        (type: string) =>
            parts.find(
                (part) =>
                    part.type === type,
            )?.value ?? "0";

    const asUtc =
        Date.UTC(
            Number(get("year")),
            Number(get("month")) - 1,
            Number(get("day")),
            Number(get("hour")),
            Number(get("minute")),
            Number(get("second")),
        );

    return (
        asUtc -
        date.getTime()
    );
}

function easternTimeToDate(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
): Date {
    const wallTime =
        Date.UTC(
            year,
            month - 1,
            day,
            hour,
            minute,
            0,
        );

    let result =
        new Date(wallTime);

    result =
        new Date(
            wallTime -
            getTimeZoneOffsetMs(
                result,
            ),
        );

    return result;
}

function formatIso(
    date: Date,
): string {
    return date.toISOString();
}

function findNextTradingDay(
    year: number,
    month: number,
    day: number,
): {
    year: number;
    month: number;
    day: number;
} {
    const date =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day,
            ),
        );

    for (let i = 0; i < 370; i++) {
        date.setUTCDate(
            date.getUTCDate() + 1,
        );

        const nextYear =
            date.getUTCFullYear();

        const nextMonth =
            date.getUTCMonth() + 1;

        const nextDay =
            date.getUTCDate();

        if (
            isTradingDay(
                nextYear,
                nextMonth,
                nextDay,
            )
        ) {
            return {
                year: nextYear,
                month: nextMonth,
                day: nextDay,
            };
        }
    }

    return {
        year,
        month,
        day,
    };
}

function findPreviousTradingDay(
    year: number,
    month: number,
    day: number,
): {
    year: number;
    month: number;
    day: number;
} {
    const date =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day,
            ),
        );

    for (let i = 0; i < 370; i++) {
        date.setUTCDate(
            date.getUTCDate() - 1,
        );

        const previousYear =
            date.getUTCFullYear();

        const previousMonth =
            date.getUTCMonth() + 1;

        const previousDay =
            date.getUTCDate();

        if (
            isTradingDay(
                previousYear,
                previousMonth,
                previousDay,
            )
        ) {
            return {
                year: previousYear,
                month: previousMonth,
                day: previousDay,
            };
        }
    }

    return {
        year,
        month,
        day,
    };
}

export function getUsMarketStatus(
    exchange = "NASDAQ",
): MarketStatus {
    const now =
        new Date();

    const eastern =
        getEasternParts(now);

    const dateKey =
        getDateKey(
            eastern.year,
            eastern.month,
            eastern.day,
        );

    const currentMinutes =
        eastern.hour * 60 +
        eastern.minute;

    const tradingDay =
        isTradingDay(
            eastern.year,
            eastern.month,
            eastern.day,
        );

    let isOpen = false;

    if (tradingDay) {
        isOpen =
            currentMinutes >=
                MARKET_OPEN_MINUTES &&
            currentMinutes <
                MARKET_CLOSE_MINUTES;
    }

    let nextOpen: Date;
    let nextClose: Date;

    if (
        tradingDay &&
        currentMinutes <
            MARKET_OPEN_MINUTES
    ) {
        nextOpen =
            easternTimeToDate(
                eastern.year,
                eastern.month,
                eastern.day,
                9,
                30,
            );

        nextClose =
            easternTimeToDate(
                eastern.year,
                eastern.month,
                eastern.day,
                16,
                0,
            );
    }
    else if (
        tradingDay &&
        currentMinutes <
            MARKET_CLOSE_MINUTES
    ) {
        nextOpen =
            easternTimeToDate(
                eastern.year,
                eastern.month,
                eastern.day,
                9,
                30,
            );

        nextClose =
            easternTimeToDate(
                eastern.year,
                eastern.month,
                eastern.day,
                16,
                0,
            );
    }
    else {
        const nextDay =
            findNextTradingDay(
                eastern.year,
                eastern.month,
                eastern.day,
            );

        nextOpen =
            easternTimeToDate(
                nextDay.year,
                nextDay.month,
                nextDay.day,
                9,
                30,
            );

        nextClose =
            easternTimeToDate(
                nextDay.year,
                nextDay.month,
                nextDay.day,
                16,
                0,
            );
    }

    if (!tradingDay) {
        const previousDay =
            findPreviousTradingDay(
                eastern.year,
                eastern.month,
                eastern.day,
            );

        const previousClose =
            easternTimeToDate(
                previousDay.year,
                previousDay.month,
                previousDay.day,
                16,
                0,
            );

        nextClose =
            previousClose;
    }

    return {
        exchange:
            exchange.toUpperCase(),

        isOpen,

        timezone:
            MARKET_TIMEZONE,

        currentTime:
            formatIso(now),

        nextOpen:
            formatIso(nextOpen),

        nextClose:
            formatIso(nextClose),
    };
}