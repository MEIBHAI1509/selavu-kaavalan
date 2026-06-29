export interface Expense {
    id: string;
    user_id: string;
    wallet_id: string;
    category_id: string;
    amount: number;
    note: string | null;
    expense_date: string;
    created_at: string;
  
    wallets?: {
      name: string;
    };
  
    categories?: {
      name: string;
      icon: string | null;
    };
  }