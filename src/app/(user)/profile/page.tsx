"use client";

import { useUser } from "@/hooks/use-user";
import { useSettings } from "@/hooks/use-settings";
import { useProfileStats } from "@/hooks/use-profile-stats";
import { useRecentActivity } from "@/hooks/use-recent-activity";

import ProfileHeader from "@/components/profile/profile-header";
import ProfileStats from "@/components/profile/profile-stats";
import RecentActivity from "@/components/profile/recent-activity";
import AccountInfo from "@/components/profile/account-info";
import QuickActions from "@/components/profile/quick-actions";

export default function ProfilePage() {
    const user = useUser();

    const {
        settings,
        loading,
    } = useSettings(user?.id);

    const stats =
        useProfileStats(user?.id);

    const activities =
        useRecentActivity(user?.id);

    if (
        !user ||
        loading ||
        !settings
    ) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <ProfileHeader user={user} />

            <ProfileStats
                wallets={stats.wallets}
                expenses={stats.expenses}
                income={stats.income}
                goals={stats.goals}
                recurring={stats.recurring}
            />

            <div className="grid gap-8 xl:grid-cols-2">
                <RecentActivity
                    activities={activities}
                />

                <AccountInfo
                    settings={settings}
                />
            </div>

            <QuickActions />
        </div>
    );
}