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

import { FormSelect } from "@/components/forms/form-select";

import { SubmitButton } from "@/components/forms/submit-button";

import { UserSettings } from "@/types/user-settings";

import { settingsService } from "@/services/settings.service";

const schema = z.object({
    currency: z.string(),

    currency_symbol: z.string(),

    date_format: z.string(),

    first_day_of_week: z.enum([
        "monday",
        "sunday",
    ]),
});

type FormValues =
    z.infer<typeof schema>;

interface Props {
    settings: UserSettings;
}

export default function FinanceSettingsCard({
    settings,
}: Props) {
    const [loading, setLoading] =
        useState(false);

    const form =
        useForm<FormValues>({
            resolver:
                zodResolver(schema),

            defaultValues: {
                currency:
                    settings.currency,

                currency_symbol:
                    settings.currency_symbol,

                date_format:
                    settings.date_format,

                first_day_of_week:
                    settings.first_day_of_week,
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
                    Finance Settings
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
                            name="currency"
                            label="Currency"
                            options={[
                                {
                                    label: "Indian Rupee (INR)",
                                    value: "INR",
                                },
                                {
                                    label: "US Dollar (USD)",
                                    value: "USD",
                                },
                                {
                                    label: "Euro (EUR)",
                                    value: "EUR",
                                },
                                {
                                    label: "British Pound (GBP)",
                                    value: "GBP",
                                },
                            ]}
                        />
                        <FormSelect
                            control={form.control}
                            name="currency_symbol"
                            label="Currency Symbol"
                            options={[
                                {
                                    label: "₹",
                                    value: "₹",
                                },
                                {
                                    label: "$",
                                    value: "$",
                                },
                                {
                                    label: "€",
                                    value: "€",
                                },
                                {
                                    label: "£",
                                    value: "£",
                                },
                            ]}
                        />
                        <FormSelect
                            control={form.control}
                            name="date_format"
                            label="Date Format"
                            options={[
                                {
                                    label: "DD/MM/YYYY",
                                    value: "dd/MM/yyyy",
                                },
                                {
                                    label: "MM/DD/YYYY",
                                    value: "MM/dd/yyyy",
                                },
                                {
                                    label: "YYYY-MM-DD",
                                    value: "yyyy-MM-dd",
                                },
                            ]}
                        />
                        <FormSelect
                            control={form.control}
                            name="first_day_of_week"
                            label="First Day of Week"
                            options={[
                                {
                                    label: "Monday",
                                    value: "monday",
                                },
                                {
                                    label: "Sunday",
                                    value: "sunday",
                                },
                            ]}
                        />
                        <SubmitButton
                            loading={loading}
                        >
                            Save Finance Settings
                        </SubmitButton>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}