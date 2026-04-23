import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RightSide — Know your rights. In plain English.",
  description:
    "AI legal copilot for landlords, tenants, freelancers, and small claims. Cheaper than a lawyer. Faster than Google.",
  openGraph: {
    title: "RightSide — Know your rights. In plain English.",
    description:
      "AI legal copilot for landlords, tenants, freelancers, and small claims. Cheaper than a lawyer. Faster than Google.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=RightSide&accent=sky&category=Consumer%20legal",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=RightSide&accent=sky&category=Consumer%20legal",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
