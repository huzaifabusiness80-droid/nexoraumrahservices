import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder,
      resource_type: "auto",
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
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: result.result === "ok" };
  } catch (error: any) {
    console.error("Cloudinary deletion error:", error);
    return { success: false, error: error?.message };
  }
}
