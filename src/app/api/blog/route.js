import { NextResponse } from 'next/server';
import Blog from '@/models/Blog';
import connectMongoDB from '@/db/db';

export async function GET() {
  try {
    await connectMongoDB();

    const Blogs = await Blog.find({});

    return NextResponse.json({ Blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Blogs", error);
    return NextResponse.error(error, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();

    const { title, desc, blogimg } = await request.json();

    const BlogPost = await Blog.create({
      title,
      desc,
      blogimg
    });

    return NextResponse.json(
      { message: "Blog Post Created", BlogPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Blog Post:", error);
    return NextResponse.error(error, { status: 500 });
  }
}
