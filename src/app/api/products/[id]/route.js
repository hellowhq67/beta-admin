import Product from "@/models/prouduct";
import { NextResponse } from "next/server";
import connectMongoDB from '@/db/db';

export async function GET(request, { params }) {
    const { id } = params;
    try {
        await connectMongoDB();
        const product = await Product.findOne({ _id: id });
        if (!product) {
            return NextResponse.error(new Error("Product not found"), { status: 404 });
        }
        return NextResponse.json({ product }, { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' } });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.error(error);
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    const record = { _id: id };
    try {
        await connectMongoDB();
        const res = await Product.deleteOne(record);
        if (res.deletedCount === 0) {
            return NextResponse.error(new Error("Product not found"), { status: 404 });
        }
        return NextResponse.json({ success: true }, { status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'DELETE, OPTIONS' } });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.error(error);
    }
}
