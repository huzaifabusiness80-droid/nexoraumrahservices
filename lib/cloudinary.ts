import { v2 as cloudinary } from "cloudinary";

// Clean credentials helper to remove accidental quotes, whitespace, or newlines (common in Vercel env UI)
const clean = (val?: string) => (val || "").trim().replace(/^["']|["']$/g, "").trim();

const cloud_name = clean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
const api_key = clean(process.env.CLOUDINARY_API_KEY);
const api_secret = clean(process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true,
});

export default cloudinary;

/**
 * Upload an image buffer or base64 data to Cloudinary
 * @param fileUri - Base64 string or file path/URL
 * @param folder - Destination folder in Cloudinary
 */
export async function uploadImageToCloudinary(
  fileUri: string,
  folder: string = "nexora"
) {
  try {
    const cName = clean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    const aKey = clean(process.env.CLOUDINARY_API_KEY);
    const aSecret = clean(process.env.CLOUDINARY_API_SECRET);

    if (!cName || !aKey || !aSecret) {
      return {
        success: false,
        error: "Missing Cloudinary configuration. Please verify NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
      };
    }

    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder,
      resource_type: "auto",
      cloud_name: cName,
      api_key: aKey,
      api_secret: aSecret,
    });
    return {
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    };
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error?.message || "Failed to upload image",
    };
  }
}

/**
 * Delete an image from Cloudinary by its public ID
 */
export async function deleteImageFromCloudinary(publicId: string) {
  try {
    const cName = clean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    const aKey = clean(process.env.CLOUDINARY_API_KEY);
    const aSecret = clean(process.env.CLOUDINARY_API_SECRET);

    if (cName && aKey && aSecret) {
      cloudinary.config({
        cloud_name: cName,
        api_key: aKey,
        api_secret: aSecret,
        secure: true,
      });
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
    return { success: result.result === "ok" };
  } catch (error: any) {
    console.error("Cloudinary deletion error:", error);
    return { success: false, error: error?.message };
  }
}
