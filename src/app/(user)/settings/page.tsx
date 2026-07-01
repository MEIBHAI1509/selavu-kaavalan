"use client";

import { useUser } from "@/hooks/use-user";
import { useSettings } from "@/hooks/use-settings";

import ProfileCard from "@/components/settings/profile-card";
import AppearanceCard from "@/components/settings/appearance-card";
import FinanceSettingsCard from "@/components/settings/finance-settings-card";
import NotificationSettingsCard from "@/components/settings/notification-settings-card";
import SecurityCard from "@/components/settings/security-card";

export default function SettingsPage() {
  const user = useUser();

  const {
    settings,
    loading,
  } = useSettings(user?.id);

  if (!user || loading || !settings) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Cards */}

      <div className="grid gap-8">
        <ProfileCard
          user={user}
        />

        <AppearanceCard
          settings={settings}
        />

        <FinanceSettingsCard
          settings={settings}
        />

        <NotificationSettingsCard
          settings={settings}
        />

        <SecurityCard />
      </div>
    </div>
  );
}