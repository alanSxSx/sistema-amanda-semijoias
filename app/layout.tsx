import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css';
import { Header } from './components/Header';

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
      
      <body className={`${inter.className} bg-[#1F0B0B]`}>
        <Header />
				{children}
			</body>
    </html>
		</PrimeReactProvider>
  );
}
