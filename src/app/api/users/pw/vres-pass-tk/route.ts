import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

type PasswordResetReqBody = {
    token: string;
    password: string;
};

export async function POST(req: NextRequest) {
    try {
        const body: PasswordResetReqBody = await req.json();

        // find user with token
        const user = await User.findOne({
            forgotPasswordToken: body.token,
        });
        if (!user) {
            return {
                status: 400,
                json: {
                    error: "Invalid Token",
                },
            };
        }
        if (user.forgotPasswordTokenExpire < Date.now()) {
            return {
                status: 400,
                json: {
                    error: "Token Expired",
                },
            };
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpire = undefined;
        await user.save();
        return NextResponse.json({
            message: "Password Reset Successfully",
            success: true,
        });
    } catch (error: any) {}
}
