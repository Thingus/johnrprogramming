import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubikSans = Rubik({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John R Programming",
  description: "A semiprofessional website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubikSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
