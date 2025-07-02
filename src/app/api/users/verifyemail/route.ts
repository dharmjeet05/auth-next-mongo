/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/db/dbConfig";
import User from "@/models/user.model";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log("token", token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token details" },
        { status: 400 }
      );
    }

    console.log("user", user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
