import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pranav Suresh | Full Stack Developer",
  description:
    "Portfolio of Pranav Suresh — Full Stack Developer & Creative Technologist building modern web experiences.",
  keywords: ["Pranav Suresh", "Full Stack Developer", "Portfolio", "React", "Next.js"],
  authors: [{ name: "Pranav Suresh" }],
  openGraph: {
    title: "Pranav Suresh | Full Stack Developer",
    description: "Portfolio of Pranav Suresh — Full Stack Developer & Creative Technologist",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
