import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ status: false, message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ status: true, blog });
  } catch (error: any) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const updatedBlog = await Blog.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ status: true, blog: updatedBlog });
  } catch (error: any) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Blog.findByIdAndDelete(params.id);
    return NextResponse.json({ status: true, message: "Blog deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
