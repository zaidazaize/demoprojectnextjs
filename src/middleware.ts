import { NextResponse ,NextRequest} from "next/server";
import User from "./models/userModel";

const publicPaths : string[] = ['/login','/signup']

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isPublic = publicPaths.includes(path);
    const token = req.cookies.get("token")?.value || "";
    
    if(isPublic && token){
        return  NextResponse.redirect(new URL("/profile", req.nextUrl));
    }
    
    if (!token && !isPublic) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
}



export const config = {
    matcher: [
        '/',
        '/login',
        '/profile/:path*',
        '/signup',
    ]
}