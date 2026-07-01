"use client";

import { useState } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Form,
} from "@/components/ui/form";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { FormSelect } from "@/components/forms/form-select";

import { SubmitButton } from "@/components/forms/submit-button";

import { UserSettings } from "@/types/user-settings";

import { settingsService } from "@/services/settings.service";

import { useTheme } from "next-themes";

const schema = z.object({
    theme: z.enum([
        "light",
        "dark",
        "system",
    ]),
});

type FormValues =
    z.infer<typeof schema>;

interface Props {
    settings: UserSettings;
}

export default function AppearanceCard({
    settings,
}: Props) {
    const { setTheme } =
        useTheme();

    const [loading, setLoading] =
        useState(false);

    const form =
        useForm<FormValues>({
            resolver:
                zodResolver(schema),

            defaultValues: {
                theme: settings.theme,
            },
        });

    const onSubmit: SubmitHandler<
        FormValues
    > = async (values) => {
        try {
            setLoading(true);

            setTheme(values.theme);

            const { error } =
                await settingsService.updateSettings(
                    settings.user_id,
                    {
                        theme:
                            values.theme,
                    }
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
                    Appearance
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(
                            onSubmit
                        )}
                        className="space-y-5"
                    >
                        <FormSelect
                            control={form.control}
                            name="theme"
                            label="Theme"
                            options={[
                                {
                                    label: "Light",
                                    value: "light",
                                },
                                {
                                    label: "Dark",
                                    value: "dark",
                                },
                                {
                                    label: "System",
                                    value: "system",
                                },
                            ]}
                        />

                        <SubmitButton
                            loading={loading}
                        >
                            Save Appearance
                        </SubmitButton>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}