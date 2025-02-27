import type { Metadata } from "next";
import {Archivo } from 'next/font/google';
import "./globals.css";
import { cn } from "@/components/lib/utils";


const archivo = Archivo({
  display: "swap",
  weight : "variable",
  subsets: ["latin"],
  variable: "--archivo-font",
});

export const metadata: Metadata = {
  title: "IFLAG Website",
  description: "Created with HATUM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`antialiased bg-stone-200 text-stone-900 ${archivo.variable} font-sans`)}>
      {/* <ThemeProvider attribute="class" defaultTheme="black">
        
        </ThemeProvider> */}
          {children}
        </body> 
    </html>
   
  );
}
