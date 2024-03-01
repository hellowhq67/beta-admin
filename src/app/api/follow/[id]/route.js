import connectMongoDB from '@/db/db';
import Follow from '@/models/follow';
import { NextResponse } from 'next/server';

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
