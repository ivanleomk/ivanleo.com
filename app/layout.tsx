import Image from "next/image";
import "./globals.css";
import "./mdx.css";
import { envSchema } from "@/types/env";
import Link from "next/link";
import Script from "next/script";

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
        <header className="container mx-auto max-w-6xl">
          <div className="w-full flex flex-col items-start sm:flex-row sm:items-center sm:justify-between border-b py-4 mx-4">
            <div className="flex items-center space-x-2">
              <div className="block h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src="/ProfilePic.jpeg"
                  alt="Logo"
                  width={48}
                  height={48}
                />
              </div>

              <div className="flex flex-col space-y-1 text-sm leading-none">
                <a
                  href="https://twitter.com/ivanleomk"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2"
                >
                  <p className="font-bold">@ivanleomk</p>
                </a>
                <span>I write code sometimes</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer my-2 sm:my-0">
              <Link href="/" className="text-sm hover:font-semibold">
                Home
              </Link>
              <Link href="/posts" className="text-sm hover:font-semibold">
                Posts
              </Link>
              <a href="https://dump.ivanleo.com/" target="_blank" rel="noopener" className="text-sm hover:font-semibold">
                Notes
              </a>
              <Link href="/work-log" className="text-sm hover:font-semibold">
                Work Log
              </Link>
            </div>
          </div>
        </header>
        <div className="container mx-auto pt-2 max-w-4xl">
          <div className="mx-4 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
