export interface Income {
    id: string;
    user_id: string;
    wallet_id: string;
  
    amount: number;
    source: string;
    note: string | null;
  
    income_date: string;
    created_at: string;
  
    wallets?: {
      name: string;
    };
  }