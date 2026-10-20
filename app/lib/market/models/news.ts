export interface News {
    id: string;

    headline: string;

    summary: string;

    image: string;

    source: string;

    url: string;

    publishedAt: number;
}

export type NewsList = News[];