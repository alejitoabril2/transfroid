import Image from "next/image";

type BrandLogoProps = {
  priority?: boolean;
  compact?: boolean;
  alt?: string;
};

export function BrandLogo({ priority = false, compact = false, alt = "Logo de TRANSFROID FAM" }: BrandLogoProps) {
  return (
    <Image
      src="/images/transfroid/brand/transfroid-logo-transport-transparent.png"
      alt={alt}
      width={1254}
      height={1254}
      priority={priority}
      unoptimized
      sizes={compact ? "88px" : "(max-width: 767px) 144px, 176px"}
      className={compact ? "h-20 w-20 shrink-0 object-contain" : "h-36 w-36 object-contain md:h-44 md:w-44"}
    />
  );
}
