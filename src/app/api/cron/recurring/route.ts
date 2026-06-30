import { NextResponse } from "next/server";

import { recurringService } from "@/services/recurring.service";

export async function GET() {
  const { error } =
    await recurringService.processRecurring();

  if (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}