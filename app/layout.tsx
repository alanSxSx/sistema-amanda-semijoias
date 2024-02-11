import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Amanda Semijoias",
  description: "Sistema de estoque Amanda Semijoias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<PrimeReactProvider>
    <html lang="pt-br">
      <body className={`${inter.className} w-min-screen bg-[#1F0B0B]`}>{children}</body>
    </html>
		</PrimeReactProvider>
  );
}
