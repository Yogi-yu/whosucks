import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AppProvider } from "@/lib/AppContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const TITLE = "WHO IS GOAT? — Messi vs Ronaldo";
const DESCRIPTION = "LIVE BATTLE: Messi vs Ronaldo. Pick a side — who is the GOAT?";

export const metadata: Metadata = {
  metadataBase: new URL("https://whosucks.org"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "GOAT Battle",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "GOAT Battle",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Messi vs Ronaldo — LIVE BATTLE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans arena-bg min-h-screen`}>
        <AppProvider>
          <div className="mx-auto min-h-screen max-w-md">{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
