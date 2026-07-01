"use client";

import Image from "next/image";

import { User } from "@supabase/supabase-js";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Calendar,
    Mail,
    Settings,
} from "lucide-react";

import { useRouter } from "next/navigation";

interface Props {
    user: User;
}

export default function ProfileHeader({
    user,
}: Props) {
    const router =
        useRouter();

    const joinedDate =
        user.created_at
            ? new Date(
                user.created_at
            ).toLocaleDateString(
                "en-IN",
                {
                    month: "long",
                    year: "numeric",
                }
            )
            : "-";
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-8">

                <div className="flex flex-col items-center text-center">

                    <Image
                        src={
                            user.user_metadata
                                ?.avatar_url ||
                            "/avatar.png"
                        }
                        alt="Avatar"
                        width={120}
                        height={120}
                        className="rounded-full border"
                    />

                    <h1 className="mt-5 text-3xl font-bold">
                        {user.user_metadata
                            ?.full_name ||
                            "User"}
                    </h1>

                    <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />

                        <span>{user.email}</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />

                        <span>
                            Member since {joinedDate}
                        </span>
                    </div>

                    <button
                        className="mt-8 flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
                        onClick={() =>
                            router.push("/settings")
                        }
                    >

                        <Settings className="h-4 w-4" />

                        Edit Settings

                    </button>

                </div>

            </CardContent>
        </Card>
    );
}