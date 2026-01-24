import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import cloudinary from "@/lib/cloudinary";

// ✅ POST — Add new blog with image upload
export const dynamic = "force-dynamic";
export const POST = async (request: NextRequest) => {
    try {
        await connectToDatabase();

        const formData = await request.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const category = formData.get("category") as string;
        const author = formData.get("author") as string;
        const content = formData.get("content") as string;
        const imageFile = formData.get("image") as File | null;

        if (!title || !description || !content || !imageFile) {
            return NextResponse.json(
                { status: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // ✅ Upload image to Cloudinary
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise<{ secure_url: string }>(
            (resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "blogs" }, (error, result) => {
                        if (error || !result) reject(error);
                        else resolve(result);
                    })
                    .end(buffer);
            }
        );

        // ✅ Save blog in MongoDB
        const newBlog = new Blog({
            title,
            description,
            category,
            author,
            content,
            image: uploadResult.secure_url,
        });

        await newBlog.save();

        return NextResponse.json(
            { status: true, message: "Blog added successfully", blog: newBlog },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ Error creating blog:", error);
        return NextResponse.json(
            { status: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};

// ✅ GET — Fetch all blogs
export const GET = async () => {
    try {
        await connectToDatabase();
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return NextResponse.json({ status: true, blogs });
    } catch (error) {
        console.error("❌ Error fetching blogs:", error);
        return NextResponse.json(
            { status: false, message: "Failed to fetch blogs" },
            { status: 500 }
        );
    }
};
