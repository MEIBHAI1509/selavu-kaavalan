export interface RecurringTransaction {
    id: string;
    user_id: string;
    wallet_id: string;
    category_id: string | null;
    type: "income" | "expense";
    title: string;
    amount: number;
    frequency:
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly";
    start_date: string;
    next_due_date: string;
    is_active: boolean;
    note: string | null;
    created_at: string;
    wallets?: {
      name: string;
    };
    categories?: {
      name: string;
      icon: string | null;
    };
  }