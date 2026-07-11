import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Glutify: Find foods you can eat",
  description:
    "Scan a barcode, snap a label, or paste ingredients to check for gluten in seconds.",
  manifest: "/glutify/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Glutify",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/glutify/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/glutify/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/glutify/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#181811",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function GlutifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
