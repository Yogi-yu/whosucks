import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AppProvider } from "@/lib/AppContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "WHO IS GOAT? — Messi vs Ronaldo",
  description: "Pick a side. Messi or Ronaldo. Who is the GOAT?",
  applicationName: "GOAT Battle",
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
