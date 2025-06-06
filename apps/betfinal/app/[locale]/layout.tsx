import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { ReactNode } from "react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { Locale } from "../../i18n/routing";
import { Providers } from "./providers";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: Locale };
}

async function loadMessages(locale: Locale): Promise<AbstractIntlMessages> {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    return {};
  }
}

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await loadMessages(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>
              <Header title={"BetFinal"} />
              {children}
            </Providers>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
