import type { Metadata } from "next";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wash Car",
  description: "Wash Car App created by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={montserrat.className}>
          <main className="flex min-h-screen justify-around items-center bg-slate-300">
            {children}
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
