export interface UserSettings {
    user_id: string;
  
    theme:
      | "light"
      | "dark"
      | "system";
  
    currency: string;
  
    currency_symbol: string;
  
    language: string;
  
    timezone: string;
  
    date_format: string;
  
    first_day_of_week:
      | "monday"
      | "sunday";
  
    budget_notifications: boolean;
  
    goal_notifications: boolean;
  
    recurring_notifications: boolean;
  
    email_notifications: boolean;
  
    created_at: string;
  
    updated_at: string;
  }