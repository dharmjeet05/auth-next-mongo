/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import { connect } from "@/db/dbConfig";

connect();

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
