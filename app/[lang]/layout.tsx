import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Loosip",
  description: "Loosip",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{lang: string}>;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const {lang} = await params;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
        <Provider>
          <div className={cn("flex min-h-screen")}>
            <main className="flex-1 w-full">{children}</main>
          </div>
        </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
