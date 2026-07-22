import type { Metadata } from "next";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteNav } from "../components/layout/SiteNav";
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
      { url: "/images/transfroid/brand/transfroid-favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/images/transfroid/brand/transfroid-favicon-64.png",
    apple: "/images/transfroid/brand/transfroid-apple-touch-transport.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
