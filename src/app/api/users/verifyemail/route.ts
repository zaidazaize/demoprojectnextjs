import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log(reqBody);
        const token = reqBody.token;

        const user = await User.findOne({
            verifyToken: token,
        });
        console.log(user);
        if (!user) {
            return NextResponse.json(
                { error: "Invalid Token" },
                { status: 400 }
            );
        }
        if (user.verifyTokenExpire < Date.now()) {
            return NextResponse.json(
                { error: "Token Expired" },
                { status: 400 }
            );
        }

        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;
        user.isVerified = true;
        await user.save();

        return NextResponse.json(
            { message: "Email Varified" },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
