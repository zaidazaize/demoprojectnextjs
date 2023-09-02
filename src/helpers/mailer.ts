import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { EmailType, EmailData } from "@/models/utilModels/types";

export const sendEmail = async ({ email, emailType, userId }: EmailData) => {
    console.log("mailer", email, emailType, userId);
    try {
        const encrypt = await bcrypt.hash(userId.toString(), 10);
        console.log("mailer", encrypt);

        switch (emailType) {
            case EmailType.VARIFICATION:
                await User.findByIdAndUpdate(userId, {
                    verifyToken: encrypt,
                    verifyTokenExpire: Date.now() + 3600000,
                });
                break;
            case EmailType.FORGOT_PASSWORD:
                await User.findByIdAndUpdate(userId, {
                    forgotPasswordToken: encrypt,
                    forgotPasswordTokenExpire: Date.now() + 3600000,
                });
                break;
        }

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
            to: email,
            subject:
                emailType === EmailType.VARIFICATION
                    ? "Verify your Email"
                    : "Reset Your Password ",
            html: `<p>Click <a href="${process.env.DOMAIN}/${
                emailType === EmailType.VARIFICATION
                    ? "verifyemail"
                    : "reset-password"
            }?token=${encrypt}">here</a> to ${
                emailType === EmailType.VARIFICATION
                    ? "verify your email"
                    : "reset your password"
            } </p>`,
        };

        const responce = await transport.sendMail(mailOptions);

        console.log("mailer", responce);

        return responce;
    } catch (error: any) {
        console.log("mailer", error);
    }
};
