import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { EmailType, EmailData } from "@/models/utilModels/types";
import { connect } from "@/dbConfig/dbConfig";   

connect();

export const sendEmail = async ({ user, emailType, validLoc }: EmailData) => {
    console.log("mailer", user, emailType, validLoc);
    console.log("mailer",user.toString())
    try {
        console.log("mailer", user, emailType, validLoc);
        console.log("mailer", user._id.toString());
        const encrypt = await bcrypt.hash(user._id.toString(), 10);
        console.log("mailer", encrypt);

        switch (emailType) {
            case EmailType.VARIFICATION:
                user.verifyToken = encrypt;
                user.verifyTokenExpiry = Date.now() + 3600000;
                break;
            case EmailType.FORGOT_PASSWORD:
                user.forgotPasswordToken = encrypt;
                user.forgotPasswordTokenExpiry = Date.now() + 3600000;
                break;
        }

        await user.save();
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "853de67887cac5",
                pass: "caa91a2aa6c641",
            },
        });

        const mailOptions = {
            from: "zaid.azaize@gmail.com",
            to: user.email,
            subject:
                emailType === EmailType.VARIFICATION
                    ? "Verify your Email"
                    : "Reset Your Password ",
            html: `<p>Click <a href="${
                process.env.DOMAIN
            }/${validLoc}?token=${encrypt}">here</a> to ${
                emailType === EmailType.VARIFICATION
                    ? "verify your email"
                    : "reset your password"
            } </p>`,
        };

        const responce = await transport.sendMail(mailOptions);

        console.log("mailer", responce);

        return {
            responce,
            success: true,
        };
    } catch (error: any) {
        console.log("mailer", error);
    }
};
