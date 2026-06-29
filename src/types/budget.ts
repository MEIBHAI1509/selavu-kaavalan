export interface Budget {
    id: string;

    user_id: string;

    category_id: string;

    amount: number;

    month: number;

    year: number;

    created_at: string;

    categories?: {
        name: string;
        icon: string | null;
        color: string | null;
    };

    spent?: number;

    remaining?: number;

    percentage?: number;
}