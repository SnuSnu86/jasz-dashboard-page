<<<<<<< HEAD
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
=======
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
>>>>>>> 61f4874390d44fe158b57a189a7bcabca73cb19a

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
<<<<<<< HEAD
});
=======
})
>>>>>>> 61f4874390d44fe158b57a189a7bcabca73cb19a

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
<<<<<<< HEAD
});

export const metadata: Metadata = {
  title: "JASZ-AI Dashboard",
  description: "KI-gestützte Voice-Agent Plattform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
=======
})

export const metadata: Metadata = {
  title: "JASZ-AI Dashboard",
  description: "AI-powered voice agent dashboard",
>>>>>>> 61f4874390d44fe158b57a189a7bcabca73cb19a
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}