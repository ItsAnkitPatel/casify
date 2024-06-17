import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";

const inter = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Casify - custom high-quality phone cases",
  description: "Create custom high-quality phone cases in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="grainy-light flex min-h-[calc(100vh-3.15rem-1px)] flex-col">
          <div className="flex h-full flex-1 flex-col">
            <Providers>{children}</Providers>
          </div>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
