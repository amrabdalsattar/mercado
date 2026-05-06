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

export const metadata = {
  title: {
    default: "Mercado Commerce",
    template: "%s | Mercado Commerce",
  },
  description:
    "A scalable e-commerce experience with storefront, seller operations, and admin insights.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--surface-0)] text-[var(--ink-900)]">
        {children}
      </body>
    </html>
  );
}
