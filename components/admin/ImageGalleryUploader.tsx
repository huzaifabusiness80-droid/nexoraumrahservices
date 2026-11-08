"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FaCloudUploadAlt, FaSpinner, FaTimes } from "react-icons/fa";

interface ImageGalleryUploaderProps {
  value: string[];
  onChange: (images: string[]) => void;
  folder?: string;
  maxImages?: number;
}

export default function ImageGalleryUploader({
  value,
  onChange,
  folder = "nexora/services",
  maxImages = 6,
}: ImageGalleryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const remaining = maxImages - value.length;
    if (files.length > remaining) {
      setError(`You can add up to ${maxImages} gallery images.`);
      event.target.value = "";
      return;
    }

    const oversizedFile = files.find((file) => file.size > 8 * 1024 * 1024);
    if (oversizedFile) {
      setError(`${oversizedFile.name} is larger than the 8MB limit.`);
      event.target.value = "";
      return;
    }

    setUploading(true);
    setError(null);
    const uploadedImages = [...value];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/upload", { method: "POST", body: formData });
        const data: { success?: boolean; url?: string; error?: string } = await response.json();
        if (!response.ok || !data.success || !data.url) {
          throw new Error(data.error || `Failed to upload ${file.name}.`);
        }
        uploadedImages.push(data.url);
        onChange([...uploadedImages]);
      }
    } catch (uploadError) {
      console.error("Image gallery upload failed:", uploadError);
      setError(uploadError instanceof Error ? uploadError.message : "Failed to upload gallery images.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-zinc-500">
          Add up to {maxImages} supporting photos. {value.length}/{maxImages} uploaded.
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || value.length >= maxImages}
          className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt />}
          {uploading ? "Uploading..." : "Add Photos"}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload gallery photos"
      />

      {value.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((image, index) => (
            <div key={`${image}-${index}`} className="relative aspect-[4/3] overflow-hidden border border-zinc-200 bg-zinc-50">
              <Image src={image} alt={`Gallery photo ${index + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" unoptimized className="object-cover" />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, imageIndex) => imageIndex !== index))}
                className="absolute right-2 top-2 p-2 bg-black/70 text-white hover:bg-red-600"
                aria-label={`Remove gallery photo ${index + 1}`}
              >
                <FaTimes className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 hover:border-[#c5a059] disabled:opacity-50"
        >
          <FaCloudUploadAlt className="mx-auto mb-2 text-2xl" />
          Select multiple gallery images (PNG, JPG, WEBP, AVIF; up to 8MB each)
        </button>
      )}
      {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
