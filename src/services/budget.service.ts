import { supabase } from "@/lib/supabase/client";

export const budgetService = {
    async getBudgets(userId: string) {
        const { data: budgets, error } =
          await supabase
            .from("budgets")
            .select(`
              *,
              categories(
                name,
                icon,
                color
              )
            `)
            .eq("user_id", userId);
      
        if (error || !budgets) {
          return {
            data: null,
            error,
          };
        }
      
        const { data: expenses } =
          await supabase
            .from("expenses")
            .select(`
              category_id,
              amount,
              expense_date
            `)
            .eq("user_id", userId);
      
        const result = budgets.map(
          (budget) => {
            const spent =
              expenses
                ?.filter((expense) => {
                  const date = new Date(
                    expense.expense_date
                  );
      
                  return (
                    expense.category_id ===
                      budget.category_id &&
                    date.getMonth() + 1 ===
                      budget.month &&
                    date.getFullYear() ===
                      budget.year
                  );
                })
                .reduce(
                  (sum, expense) =>
                    sum +
                    Number(expense.amount),
                  0
                ) ?? 0;
      
            const remaining =
              Number(budget.amount) - spent;
      
            const percentage =
              Number(budget.amount) === 0
                ? 0
                : (spent /
                    Number(
                      budget.amount
                    )) *
                  100;
      
            return {
              ...budget,
              spent,
              remaining,
              percentage,
            };
          }
        );
      
        return {
          data: result,
          error: null,
        };
      },
      
  async createBudget(payload: {
    user_id: string;
    category_id: string;
    amount: number;
    month: number;
    year: number;
  }) {
    return supabase
      .from("budgets")
      .insert(payload);
  },

  async updateBudget(
    id: string,
    payload: {
      category_id: string;
      amount: number;
      month: number;
      year: number;
    }
  ) {
    return supabase
      .from("budgets")
      .update(payload)
      .eq("id", id);
  },

  async deleteBudget(id: string) {
    return supabase
      .from("budgets")
      .delete()
      .eq("id", id);
  },
};