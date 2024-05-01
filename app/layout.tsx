import { Metadata } from "next";
import { Fredoka } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/navbar/Footer";

import "swiper/css";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.expozone.irfanmuqorib.dev"),
  title: {
    default: "Expozone",
    template: `%s - Expozone`,
  },
  description:
    "Next.js 13 eCommerce app powered by Tailwind, Prisma, MongoDB, and more. Immerse yourself in seamless shopping with lightning-fast performance and secure transactions. Shop with confidence and discover a world of possibilities at Expozone!",
  icons: "/assets/brand-logo.svg",
  keywords: [
    "Ecommerce",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Prisma",
    "PostgreSQL",
    "Digital Products",
    "Software",
    "Web Application",
    "Ecommerce Application",
  ],
  authors: [
    {
      name: "Irfan Muqorib",
      url: "https://github.com/Irfanmqrb25",
    },
  ],
  creator: "Irfan Muqorib",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.expozone.irfanmuqorib.dev",
    title: "Expozone",
    description:
      "Ecommerce app powered by Next.js 13, Tailwind, Prisma, MongoDB, and more.",
    siteName: "Expozone",
  },
};

const font = Fredoka({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster richColors />
        <div>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
