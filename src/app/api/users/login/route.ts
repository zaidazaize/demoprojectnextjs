import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SigninUser } from "@/models/utilModels/types";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
    try {
        const { email, password }: SigninUser = await req.json();
        console.log("body", email, password);
        const user = await User.findOne({ email });
        //User found
        console.log("user", user);
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        //compare passoword
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                {
                    error: "Password not matched",
                },
                { status: 400 }
            );
        }
        const tokenData = {
            id: user._id,
            name: user.name,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "120s",
        });
        const response = NextResponse.json({
            message: "Login success",
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
