import "./globals.css";
import { getSite } from "@/lib/content";

export async function generateMetadata() {
  const SITE = await getSite();
  return {
    metadataBase: new URL(SITE.url),
    title: { default: `${SITE.name} – Vật tư tái sử dụng`, template: `%s | ${SITE.name}` },
    description: SITE.description,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: SITE.name,
      title: `${SITE.name} – ${SITE.tagline}`,
      description: SITE.description,
      images: ["/images/logo.png"],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05562F",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
