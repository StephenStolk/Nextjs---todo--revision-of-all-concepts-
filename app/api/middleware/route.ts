import { NextResponse } from "next/server";
import type {NextRequest} from "next/server";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isPublic = path.startsWith("/register") || path === '/login' ||
    path === '/logout';

    const token = req.cookies.get('token')?.value || "";

    if(isPublic && token) {
        return NextResponse.redirect(new URL("/", req.url));
    };

    if(!isPublic && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    };
}


export const config = {
    matcher: [
        '/',
        '/register',
        '/login',
        '/profile',
        '/verifyemail',
        '/forgotpassword',
        '/resetpassword',
    ]
};