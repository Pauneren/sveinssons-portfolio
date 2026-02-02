import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  title: "Sveinssons — Web Design & Development",
  description:
    "Sveinssons builds modern, accessible, and high-performance websites for small businesses and creative professionals.",
  keywords: [
    "web design",
    "web development",
    "front-end",
    "portfolio",
    "SEO",
    "performance",
  ],
  authors: [{ name: "Sveinssons" }],
  openGraph: {
    title: "Sveinssons — Web Design & Development",
    description:
      "Modern, accessible, and high-performance websites for small businesses and creative professionals.",
    url: siteUrl,
    siteName: "Sveinssons",
    images: [
      {
        url: `${siteUrl}/logo-variant-3.svg`,
        width: 800,
        height: 600,
        alt: "Sveinssons logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sveinssons — Web Design & Development",
    description:
      "Modern, accessible, and high-performance websites for small businesses and creative professionals.",
    images: [`${siteUrl}/logo-variant-3.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo-variant-3.svg",
    shortcut: "/logo-variant-3.svg",
    apple: "/logo-variant-3.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Remove attributes injected by browser extensions that can cause hydration mismatches. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `;(function(){try{const attrs=Array.from(document.documentElement.attributes).map(a=>a.name).filter(n=>n.startsWith('cz-'));attrs.forEach(n=>{document.documentElement.removeAttribute(n);document.body.removeAttribute(n)});}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Structured Data (JSON-LD) for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sveinssons",
              url: siteUrl,
              logo: `${siteUrl}/logo-variant-3.svg`,
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "",
                  contactType: "customer support",
                  email: "paula1@ymail.com",
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
