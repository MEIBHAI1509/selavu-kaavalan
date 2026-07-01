"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { UserSettings } from "@/types/user-settings";
import { settingsService } from "@/services/settings.service";

export function useSettings(
    userId?: string
) {
    const [settings, setSettings] =
        useState<UserSettings | null>(null);

    const [loading, setLoading] =
        useState(true);

    const load = useCallback(async () => {
        if (!userId) {
            setSettings(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const response =
                await settingsService.getSettings(userId);

            let data = response.data;
            const error = response.error;

            if (
                error &&
                error.code === "PGRST116"
            ) {
                await settingsService.createSettings(
                    userId
                );

                const retry =
                    await settingsService.getSettings(
                        userId
                    );

                data = retry.data;
            }

            setSettings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            void load();
        }, 0);

        return () => clearTimeout(timer);
    }, [load]);

    return {
        settings,
        loading,
        refetch: load,
    };
}