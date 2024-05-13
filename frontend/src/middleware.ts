import { NextRequest, NextResponse } from "next/server";

interface cookie {
    name: string;
    value: string;
}


export function middleware(req: NextRequest) {
    const token: any = req.cookies.get('token')
    // console.log("middleware",token.value)
    if (req.nextUrl.pathname.startsWith('/cart') && !token){
        return NextResponse.redirect(new URL("/", req.url));
    }

    else if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }
}

export const config = {
    matcher: ["/profile", "/cart", "/payment/:path*"]
}