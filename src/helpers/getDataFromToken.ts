import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (req: NextRequest) => {
    try {
        console.log("cookies", req.cookies)
        const token = req.cookies.get("token")?.value || "";
        console.log("token", token);
        const data: any =  jwt.verify(token, process.env.TOKEN_SECRET || "");
        console.log("data", data);
        return data.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
