"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorBoundaryClient from "./error/ErrorBoundaryClient";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <ErrorBoundaryClient>
        {children}
      </ErrorBoundaryClient>
      {!isAdmin && <Footer />}
    </>
  );
} 