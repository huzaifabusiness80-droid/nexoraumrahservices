"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaSpinner, FaTimes } from "react-icons/fa";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  folder = "nexora/services",
  label = "Upload Image",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setError("Image size must be less than 8MB");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to upload image to Cloudinary");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
        {label}
      </label>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {value ? (
        <div className="relative w-full h-44 border border-zinc-200 rounded-lg overflow-hidden bg-zinc-50 flex items-center justify-center group">
          <Image
            src={value}
            alt="Uploaded preview"
            fill
            unoptimized
            className="object-contain p-2"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-zinc-900 text-xs font-semibold rounded hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
              title="Remove image"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-zinc-300 hover:border-[#c5a059] rounded-lg p-6 text-center cursor-pointer transition-colors bg-zinc-50/50 hover:bg-zinc-50 ${
            uploading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center py-2 text-zinc-600">
              <FaSpinner className="animate-spin text-2xl text-[#c5a059] mb-2" />
              <span className="text-xs font-medium">Uploading to Cloudinary...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-500">
              <FaCloudUploadAlt className="text-3xl text-zinc-400 mb-2 group-hover:text-[#c5a059]" />
              <p className="text-xs font-semibold text-zinc-800">
                Click to browse &amp; upload image file
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                PNG, JPG, WEBP up to 8MB (Stored in Cloudinary)
              </p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
