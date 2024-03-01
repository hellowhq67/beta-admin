import { NextResponse } from 'next/server';
import Product from '@/models/prouduct'; // Import the Product model
import connectMongoDB from '@/db/db';

export async function GET() {
  try {
    await connectMongoDB(); // Connect to your MongoDB database

    const products = await Product.find({}); // Retrieve all products from the database

    // Set CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };

    return NextResponse.json({ products }, { headers }); // Return the products as JSON response with CORS headers
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.error(error); // Return an error response if there's an error
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();

    const {
      userId,
      userName,
      shippings,
      productImage1,
      productImage2,
      productImage3,
      productImage4,
      productImage5,
      designers,
      productName,
      size,
      color,
      price,
      floorPrice,
      description,
      vendor,
      condition,
      department,
      category,
      subcategory,
      tag
    } = await request.json();

    const newProduct = await Product.create({
      userId,
      userName,
      shippings,
      productImage1,
      productImage2,
      productImage3,
      productImage4,
      productImage5,
      designers,
      productName,
      size,
      color,
      price,
      floorPrice,
      description,
      vendor,
      condition,
      department,
      category,
      subcategory,
      tag
    });

    // Set CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    };

    return NextResponse.json({ message: "Product Created", product: newProduct }, { headers, status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.error(error);
  }
}
