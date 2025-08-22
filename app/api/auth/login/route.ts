import {connect} from "@/lib/dbconfig";
import { NextResponse , NextRequest} from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(req: NextRequest) {
    // await connect();

    try {
        const {email, password} = await req.json();

        if(!email || !password) {
            return NextResponse.json({
                message: "Please provide all fields"
            }, {
                status: 400
            });
        };

        const existingUser = await User.findOne({email});

        if(!existingUser) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 404
            });
        };

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if(!passwordMatch) {
            return NextResponse.json({
                message: "Invalid credentials"
            }, {
                status: 401
            });
        };

        const tokendata = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
        };

        const token = jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 24*60*60,
        });

        return response;

    } catch (error: unknown) {
        return NextResponse.json({
            message: "Something went wrong"
        }, {
            status: 500
        });
    }
}