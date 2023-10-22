import Image from "next/image";
import "./globals.css";
import "./mdx.css";
import { envSchema } from "@/types/env";
import Link from "next/link";
import Script from "next/script";
import { navConfig } from "./config/navConfig";
import CommandMenu from "./components/CommandMenu";
import { siteConfig } from "./config/site";
import { cn } from "./lib/utils";
import { buttonVariants } from "./components/ui/button";
import { Github, Twitter } from "lucide-react";
import SiteHeader from "./components/SiteHeader";

export const metadata = {
  title: "Ivan Leo",
  description:
    "Hey there! I'm a full stack engineer based in Singapore 🇸🇬. Welcome to my blog.",
  author: "Ivan Leo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We set a default parser here

  let env = envSchema.safeParse(process.env);

  if (!env.success) {
    throw new Error("Invalid Environment Variable config");
  }

  return (
    <html lang="en">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-MM8QMY5JWN" />
      <Script
        id="Google Tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-MM8QMY5JWN');
              `,
        }}
      />
      <body className="">
        <SiteHeader />
        <div className="container mx-auto pt-2 max-w-6xl">
          <div className="mx-4 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
