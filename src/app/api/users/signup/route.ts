import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { EmailType } from "@/models/utilModels/types";
// Types
import { UserReqBody } from "@/models/utilModels/types";
import { sendEmail } from "@/helpers/mailer";

export async function POST(req: NextRequest) {
    try {
        const { userName, email, password }: UserReqBody = await req.json();
        // TODO: Add validation for email and password
        await connect();
        const user = await User.findOne({ email });
        // checking if user already exists
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 422 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        await sendEmail({
            email: newUser.email,
            emailType: EmailType.VARIFICATION,
            userId: newUser._id,
        });
        return NextResponse.json({
            message: "User created successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
