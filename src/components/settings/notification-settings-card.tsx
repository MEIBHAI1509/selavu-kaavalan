"use client";

import { useState } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Form } from "@/components/ui/form";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitButton } from "@/components/forms/submit-button";

import { UserSettings } from "@/types/user-settings";

import { settingsService } from "@/services/settings.service";

import { Switch } from "@/components/ui/switch";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

const schema = z.object({
    budget_notifications: z.boolean(),

    goal_notifications: z.boolean(),

    recurring_notifications: z.boolean(),

    email_notifications: z.boolean(),
});

type FormValues =
    z.infer<typeof schema>;

interface Props {
    settings: UserSettings;
}

export default function NotificationSettingsCard({
    settings,
}: Props) {
    const [loading, setLoading] =
        useState(false);

    const form =
        useForm<FormValues>({
            resolver:
                zodResolver(schema),

            defaultValues: {
                budget_notifications:
                    settings.budget_notifications,

                goal_notifications:
                    settings.goal_notifications,

                recurring_notifications:
                    settings.recurring_notifications,

                email_notifications:
                    settings.email_notifications,
            },
        });

    const onSubmit: SubmitHandler<
        FormValues
    > = async (values) => {
        try {
            setLoading(true);

            const { error } =
                await settingsService.updateSettings(
                    settings.user_id,
                    values
                );

            if (error) {
                throw error;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Notifications
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            onSubmit
                        )}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="budget_notifications"
                            render={({ field }) => (
                                <div className="flex items-center justify-between rounded-xl border p-4">
                                    <FormItem>
                                        <FormLabel>
                                            Budget Alerts
                                        </FormLabel>
                                    </FormItem>

                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="goal_notifications"
                            render={({ field }) => (
                                <div className="flex items-center justify-between rounded-xl border p-4">
                                    <FormItem>
                                        <FormLabel>
                                            Goal Reminders
                                        </FormLabel>
                                    </FormItem>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={
                                                field.onChange
                                            }
                                        />
                                    </FormControl>
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="recurring_notifications"
                            render={({ field }) => (
                                <div className="flex items-center justify-between rounded-xl border p-4">
                                    <FormItem>
                                        <FormLabel>
                                            Recurring Reminders
                                        </FormLabel>
                                    </FormItem>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={
                                                field.onChange
                                            }
                                        />
                                    </FormControl>
                                </div>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email_notifications"
                            render={({ field }) => (
                                <div className="flex items-center justify-between rounded-xl border p-4">
                                    <FormItem>
                                        <FormLabel>
                                            Email Notifications
                                        </FormLabel>
                                    </FormItem>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={
                                                field.onChange
                                            }
                                        />
                                    </FormControl>
                                </div>

                            )}
                        />
                        <SubmitButton
                            loading={loading}
                        >
                            Save Notification Settings
                        </SubmitButton>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}