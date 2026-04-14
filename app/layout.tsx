import type { Metadata } from "next";
import "./globals.css";
import { PageTransition } from "./components/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://koala.finance"),
  title: {
    default: "KOALA | יועץ פיננסי חכם לישראלים",
    template: "%s | KOALA",
  },
  description: "KOALA מנתח את הפנסיה, הביטוח והמשכורת שלך ומספק תובנות אישיות, בחינם, תוך דקות. ללא יועץ, ללא עלות.",
  keywords: ["יועץ פיננסי", "פנסיה", "ביטוח", "שכר נטו", "ביטוח רכב", "ייעוץ פיננסי חינם", "ניתוח פנסיה"],
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://koala.finance",
    siteName: "KOALA",
    title: "KOALA | יועץ פיננסי חכם לישראלים",
    description: "ניתוח פנסיה, ביטוח ומשכורת. תובנות אישיות בדקות, בחינם",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KOALA - יועץ פיננסי חכם" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KOALA | יועץ פיננסי חכם לישראלים",
    description: "ניתוח פנסיה, ביטוח ומשכורת בחינם. תוך דקות",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&family=Inter:wght@400;500;600&family=Heebo:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased dark">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
