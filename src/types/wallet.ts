export interface Wallet {
    id: string;
    user_id: string;
    name: string;
    type: string;
    balance: number;
    color: string | null;
    icon: string | null;
    is_default: boolean;
    created_at: string;
}