import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transfroid | Transporte refrigerado inteligente",
  description:
    "Transporte terrestre de carga refrigerada en Colombia con cadena de frio, trazabilidad, seguridad vial y control operativo.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preload"
          href="/videos/transfroid-hero-1080p.mp4"
          as="video"
          type="video/mp4"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
