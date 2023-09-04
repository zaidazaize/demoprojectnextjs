import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { EmailType } from "@/models/utilModels/types";
import {connect} from "@/dbConfig/dbConfig";
type GenerateResetLinkReqBody = {
    email: string;
};
connect();

export async function POST(req: NextRequest) {
    try {
        const body: GenerateResetLinkReqBody = await req.json();
        console.log(body);
        const user:any = await User.findOne({ email: body.email, });
        console.log(user);
        if (!user) {
            return NextResponse.json({
                error: "User not found",
                success: false,
            });
        }
        const mail = await sendEmail({
            user : user,
            emailType: EmailType.FORGOT_PASSWORD,
            validLoc : "reset-password/create-new-password"
        });
        console.log(mail);
        if (mail?.success) {
            return NextResponse.json({
                message: "Email sent successfully",
                success: true,
            });
        } else {
            return NextResponse.json({
                error: "Email not sent",
                success: false,
            });
        }
    } catch (error: any) {
        NextResponse.json({
            error: error.message,
            success: false,
        });
    }
}
