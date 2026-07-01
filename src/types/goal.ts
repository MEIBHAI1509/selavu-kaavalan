export interface Goal {
    id: string;
    user_id: string;
    title: string;
    target_amount: number;
    saved_amount: number;
    target_date: string | null;
    color: string;
    icon: string;
    created_at: string;
    percentage?: number;
    remaining?: number;
    completed?: boolean;
    daysLeft?: number;
  }