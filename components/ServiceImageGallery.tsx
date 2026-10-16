import Image from "next/image";

interface ServiceImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ServiceImageGallery({ images, alt }: ServiceImageGalleryProps) {
  const galleryImages = [...new Set(images.filter(Boolean))].slice(0, 6);

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 border-t border-zinc-200 bg-white p-3" aria-label={`${alt} photo gallery`}>
      {galleryImages.map((src, index) => (
        <a
          key={`${src}-${index}`}
          href={src}
          target="_blank"
          rel="noreferrer"
          className="relative block aspect-[4/3] overflow-hidden bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a059]"
          aria-label={`Open ${alt} gallery photo ${index + 1}`}
        >
          <Image
            src={src}
            alt={`${alt} - photo ${index + 1}`}
            fill
            sizes="(max-width: 640px) 33vw, 16vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </a>
      ))}
    </div>
  );
}
