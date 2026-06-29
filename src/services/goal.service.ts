import { supabase } from "@/lib/supabase/client";

export const goalService = {
  async getGoals(userId: string) {
    const { data, error } =
      await supabase
        .from("goals")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        });

    if (error || !data) {
      return {
        data,
        error,
      };
    }

    const goals = data.map((goal) => {
      const percentage =
        goal.target_amount === 0
          ? 0
          : (Number(goal.saved_amount) /
              Number(goal.target_amount)) *
            100;

      const remaining =
        Number(goal.target_amount) -
        Number(goal.saved_amount);

      let daysLeft: number | undefined;

      if (goal.target_date) {
        const today = new Date();

        const target = new Date(
          goal.target_date
        );

        daysLeft = Math.ceil(
          (target.getTime() -
            today.getTime()) /
            (1000 * 60 * 60 * 24)
        );
      }

      return {
        ...goal,
        percentage,
        remaining,
        completed:
          percentage >= 100,
        daysLeft,
      };
    });

    return {
      data: goals,
      error: null,
    };
  },

  async createGoal(payload: {
    user_id: string;
    title: string;
    target_amount: number;
    target_date?: string;
    color: string;
    icon: string;
  }) {
    return supabase
      .from("goals")
      .insert(payload);
  },

  async updateGoal(
    id: string,
    payload: {
      title: string;
      target_amount: number;
      target_date?: string;
      color: string;
      icon: string;
    }
  ) {
    return supabase
      .from("goals")
      .update(payload)
      .eq("id", id);
  },

  async addMoney(
    id: string,
    amount: number
  ) {
    const { data } =
      await supabase
        .from("goals")
        .select("saved_amount")
        .eq("id", id)
        .single();

    if (!data) {
      return {
        error: new Error(
          "Goal not found"
        ),
      };
    }

    return supabase
      .from("goals")
      .update({
        saved_amount:
          Number(data.saved_amount) +
          amount,
      })
      .eq("id", id);
  },

  async addMoneyToGoal(payload: {
    goal_id: string;
    wallet_id: string;
    amount: number;
    note?: string;
  }) {
    return supabase.rpc(
      "add_money_to_goal",
      {
        p_goal_id: payload.goal_id,
        p_wallet_id: payload.wallet_id,
        p_amount: payload.amount,
        p_note: payload.note ?? null,
      }
    );
  },

  async deleteGoal(id: string) {
    return supabase
      .from("goals")
      .delete()
      .eq("id", id);
  },
};