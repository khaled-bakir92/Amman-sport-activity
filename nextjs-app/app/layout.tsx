import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sports Activities Amman - Football, Volleyball, Kickboxing & More | Jordan",
  description: "Join our active sports community in Amman, Jordan. Group activities including football, volleyball, basketball, yoga, running, and kickboxing. Private kickboxing lessons available for all levels.",
  keywords: ["sports Amman", "football Amman", "volleyball Jordan", "kickboxing Amman", "private kickboxing lessons", "sports activities Jordan", "fitness Amman", "expat sports Amman", "basketball Amman", "yoga Amman", "running groups Amman"],
  authors: [{ name: "Sports Activities Amman" }],
  openGraph: {
    type: "website",
    url: "https://www.sportsactivitiesamman.com/",
    title: "Sports Activities Amman - Get Active Together in Jordan",
    description: "Join our active sports community in Amman. Football, volleyball, basketball, kickboxing, yoga, and running. Private kickboxing lessons available. All fitness levels welcome!",
    images: [
      {
        url: "https://www.sportsactivitiesamman.com/images/og-image.jpg",
        alt: "Sports Activities Amman"
      }
    ],
    locale: "en_US",
    siteName: "Sports Activities Amman",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sports Activities Amman - Get Active Together",
    description: "Join our active sports community in Amman. Football, volleyball, kickboxing, yoga & more. Private lessons available!",
    images: ["https://www.sportsactivitiesamman.com/images/twitter-image.jpg"],
  },
  other: {
    "geo.region": "JO-AM",
    "geo.placename": "Amman",
    "geo.position": "31.9454;35.9284",
    "ICBM": "31.9454, 35.9284",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
