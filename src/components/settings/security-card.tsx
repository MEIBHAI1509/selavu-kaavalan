"use client";

import { useState } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { supabase } from "@/lib/supabase/client";

import {
    AlertTriangle,
    LogOut,
    Lock,
} from "lucide-react";

import { SubmitButton } from "@/components/forms/submit-button";

import { FormInput } from "@/components/forms/form-input";

import { Form } from "@/components/ui/form";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
    .object({
        password: z
            .string()
            .min(6),

        confirmPassword:
            z.string(),
    })
    .refine(
        (data) =>
            data.password ===
            data.confirmPassword,
        {
            message:
                "Passwords do not match",
            path: [
                "confirmPassword",
            ],
        }
    );

type FormValues =
    z.infer<typeof schema>;

export default function SecurityCard() {
    const [loading, setLoading] =
        useState(false);

    const form =
        useForm<FormValues>({
            resolver:
                zodResolver(schema),

            defaultValues: {
                password: "",
                confirmPassword:
                    "",
            },
        });

    const onSubmit: SubmitHandler<
        FormValues
    > = async (values) => {
        try {
            setLoading(true);

            const { error } =
                await supabase.auth.updateUser({
                    password:
                        values.password,
                });

            if (error) {
                throw error;
            }

            form.reset();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const logout =
        async () => {
            await supabase.auth.signOut();

            window.location.href =
                "/login";
        };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Security
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
                <div>
                    <div className="mb-4 flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary" />

                        <h3 className="font-semibold">
                            Change Password
                        </h3>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(
                                onSubmit
                            )}
                            className="space-y-4"
                        >
                            <FormInput
                                control={form.control}
                                name="password"
                                label="New Password"
                                type="password"
                            />

                            <FormInput
                                control={form.control}
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                            />

                            <SubmitButton
                                loading={loading}
                            >
                                Update Password
                            </SubmitButton>
                        </form>
                    </Form>
                </div>
                <div className="rounded-2xl border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold">
                                Sign Out
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Sign out from this device.
                            </p>
                        </div>

                        <button
                            onClick={logout}
                            className="rounded-xl border px-4 py-2"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
                    <div className="flex gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />

                        <div>
                            <h3 className="font-semibold text-red-500">
                                Delete Account
                            </h3>

                            <p className="mt-2 text-sm text-muted-foreground">
                                This feature should permanently remove
                                the user profile and all associated data.
                            </p>

                            <button
                                disabled
                                className="mt-4 rounded-xl bg-red-500 px-5 py-2 text-white opacity-50"
                            >
                                Coming Soon
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}