"use client";

import { useState } from "react";

import { User } from "@supabase/supabase-js";

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

import {
    FormInput,
} from "@/components/forms/form-input";

import {
    SubmitButton,
} from "@/components/forms/submit-button";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "@/lib/supabase/client";

const schema = z.object({
    full_name: z.string().min(2),

    phone: z.string().optional(),
});

type FormValues =
    z.infer<typeof schema>;

interface Props {
    user: User;
}

export default function ProfileCard({
    user,
}: Props) {
    const [loading, setLoading] =
        useState(false);

    const form =
        useForm<FormValues>({
            resolver:
                zodResolver(schema),

            defaultValues: {
                full_name:
                    user.user_metadata
                        ?.full_name ?? "",

                phone:
                    user.user_metadata
                        ?.phone ?? "",
            },
        });

    const onSubmit: SubmitHandler<
        FormValues
    > = async (values) => {
        try {
            setLoading(true);

            const { error } =
                await supabase.auth.updateUser({
                    data: {
                        full_name:
                            values.full_name,

                        phone:
                            values.phone,
                    },
                });

            if (error) throw error;
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
                    Profile
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
                        <FormInput
                            control={form.control}
                            name="full_name"
                            label="Full Name"
                        />

                        <FormInput
                            control={form.control}
                            name="phone"
                            label="Phone Number"
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Email
                            </label>

                            <div className="rounded-md border bg-muted px-3 py-2 text-sm text-muted-foreground">
                                {user.email}
                            </div>
                        </div>

                        <SubmitButton
                            loading={loading}
                        >
                            Save Profile
                        </SubmitButton>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}