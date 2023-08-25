import { NextResponse ,NextRequest} from "next/server";

const publicPaths : string[] = ['/login','/signup']

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    console.log("path", path);


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