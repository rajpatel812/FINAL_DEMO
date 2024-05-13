'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/header";
import { Footer } from "@/components/footer";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
      <Toaster position="top-center" />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
