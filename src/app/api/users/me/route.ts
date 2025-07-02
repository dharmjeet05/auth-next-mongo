import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/db/dbConfig";
import User from "@/models/user.model";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  // extract data form token
  const userId = await getDataFromToken(request);

  const user = await User.findOne({ _id: userId }).select(
    "-password -username"
  );

  // check if there is no user

  return NextResponse.json({
    message: "User Found",
    data: user,
  });
}
