import connectMongoDB from '@/db/db';
import Follow from '@/models/follow';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        await connectMongoDB();

        const {
            userId,
            productID,
        } = await request.json();

        const followProduct = await Follow.create({
            userId,
            productID,
        });

        return NextResponse.json({ message: "Follow success", followProduct }, { status: 201 });
    } catch (error) {
        console.error("Error following product:", error);
        return NextResponse.error(error);
    }
}
export async function DELETE(request, { params }) {
    try {
        await connectMongoDB();

        const { id } = params;

        // Find and delete the follow record
        await Follow.findOneAndDelete({ id });

        return NextResponse.json({ message: "Unfollowed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error unfollowing product:", error);
        return NextResponse.error(error);
    }
}