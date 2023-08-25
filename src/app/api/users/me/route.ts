import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import { isAwaitExpression } from "typescript";
import User from "@/models/userModel";

connect();

export async function GET(req: NextRequest) {
    try {
        const userid = await getDataFromToken(req);
        console.log("userid", userid);
        const user = await User.findOne({ _id: userid }).select("-password");
        console.log("me api user", user);
        return NextResponse.json({
            message: "User found",
            success: true,
            user: user,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
