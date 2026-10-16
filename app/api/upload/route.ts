import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "nexora/services";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mime = file.type || "image/jpeg";

    let cloudinaryError: string | null = null;

    // 1. First, try Cloudinary upload
    try {
      const base64Data = `data:${mime};base64,${buffer.toString("base64")}`;
      const uploadRes = await uploadImageToCloudinary(base64Data, folder);

      if (uploadRes.success && uploadRes.url) {
        return NextResponse.json({
          success: true,
          url: uploadRes.url,
          publicId: uploadRes.publicId,
          source: "cloudinary",
        });
      } else {
        cloudinaryError = uploadRes.error || "Unknown Cloudinary error";
        console.warn("Cloudinary upload failed:", cloudinaryError);
      }
    } catch (cErr: any) {
      cloudinaryError = cErr?.message || "Cloudinary exception";
      console.warn("Cloudinary error:", cloudinaryError);
    }

    // Serverless platforms (like Vercel / AWS Lambda) have read-only file systems (/var/task)
    const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
    if (isServerless) {
      return NextResponse.json(
        {
          error: `Cloudinary upload failed: ${cloudinaryError || "Please ensure Cloudinary environment variables are set in your deployment settings."}`,
        },
        { status: 500 }
      );
    }

    // 2. Fallback: Save directly to public/uploads/ (Local development only)
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadsDir, { recursive: true });

      // Clean filename
      const sanitizedOrig = file.name ? file.name.replace(/[^a-zA-Z0-9.-]/g, "_") : "image.jpg";
      const ext = path.extname(sanitizedOrig) || ".jpg";
      const base = path.basename(sanitizedOrig, ext);
      const filename = `${base}-${Date.now()}${ext}`;
      const filePath = path.join(uploadsDir, filename);

      await fs.writeFile(filePath, buffer);

      const localUrl = `/uploads/${filename}`;
      return NextResponse.json({
        success: true,
        url: localUrl,
        source: "local",
      });
    } catch (fsErr: any) {
      return NextResponse.json(
        {
          error: `File save failed: ${cloudinaryError || fsErr?.message}`,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
