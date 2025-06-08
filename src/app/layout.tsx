import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ErrorBoundaryClient from "../components/error/ErrorBoundaryClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surya Defence Academy - Pathankot",
  description: "Premier defence coaching institute in Pathankot for NDA, CDS, SSB, AFCAT, and more.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <ErrorBoundaryClient>
          {children}
        </ErrorBoundaryClient>
        <Footer />
      </body>
    </html>
  );
}
