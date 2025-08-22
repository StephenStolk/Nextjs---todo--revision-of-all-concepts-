import {connect} from "@/lib/dbconfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(req:NextRequest) {

    try {
        const {username, email, password} = await req.json();

        if(!username || !email || !password) {
            return NextResponse.json({
                message: "Please provide all fields"
            }, {
                status: 400
            })
        };

        const existingUser = await User.findOne({
            email
        });

        if(existingUser){
            return NextResponse.json({
                error: "user aalready there"
            }, {status: 400})
        };

        const newUser = new User({
            username, email, password
        });

        const saveduser = await newUser.save();

        if(saveduser) {
            return NextResponse.json({
                message: "User registered successfully",
                success: true, saveduser
            }, {
                status: 201
            });
        }

    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong"
        }, {
            status: 500
        });
    }
}