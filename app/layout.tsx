import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TRANSFROID FAM SAS | Transporte refrigerado en Colombia",
    template: "%s | TRANSFROID FAM SAS",
  },
  description:
    "Transporte terrestre de carga refrigerada en Colombia con cadena de frío, trazabilidad, seguridad vial y control operativo.",
  icons: {
    icon: [
      { url: "/images/transfroid/brand/transfroid-mark-64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/images/transfroid/brand/transfroid-mark-64.png",
    apple: "/images/transfroid/brand/transfroid-apple-touch.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
