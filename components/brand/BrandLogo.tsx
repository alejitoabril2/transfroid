import Image from "next/image";

type BrandLogoProps = {
  priority?: boolean;
  compact?: boolean;
  alt?: string;
};

export function BrandLogo({ priority = false, compact = false, alt = "Logo de TRANSFROID FAM" }: BrandLogoProps) {
  return (
    <Image
      src="/images/transfroid/brand/transfroid-logo-vertical-768.webp"
      alt={alt}
      width={768}
      height={768}
      priority={priority}
      unoptimized
      sizes={compact ? "64px" : "(max-width: 767px) 144px, 176px"}
      className={compact ? "h-14 w-14 shrink-0 object-contain" : "h-36 w-36 object-contain md:h-44 md:w-44"}
    />
  );
}
