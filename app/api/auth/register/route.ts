import {connect} from "@/lib/dbconfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req:NextRequest) {
    await connect();

    try {
        const {username, email, password} = await req.json();

        if(!username || !email || !password) {
            return NextResponse.json({
                message: "Please provide all fields"
            }, {
                status: 400
            })
        };

        

    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong"
        }, {
            status: 500
        });
    }
}