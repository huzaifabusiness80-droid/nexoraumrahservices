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
        console.warn("Cloudinary upload failed, falling back to local storage:", uploadRes.error);
      }
    } catch (cErr: any) {
      console.warn("Cloudinary error, falling back to local storage:", cErr?.message);
    }

    // 2. Fallback: Save directly to public/uploads/
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
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
