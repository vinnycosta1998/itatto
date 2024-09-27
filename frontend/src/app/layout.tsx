import type { GetServerSideProps, Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Poppins } from "@next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const poppinsMono = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Itatto",
  description: "Seu studio virtual de tatuagens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${poppinsMono} antialiased`}
        >
          <Toaster richColors />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
