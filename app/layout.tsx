import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import {ReactNode} from "react";

import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

interface RootLayoutProps {
  children: ReactNode;
  modal?: ReactNode;
}

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub - manage your notes quickly and efficiently",
  openGraph: {
    title: "NoteHub",
    description: "NoteHub - manage your notes quickly and efficiently",
    url: "https://your-vercel-domain.vercel.app",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function RootLayout({children, modal}: RootLayoutProps){
  return(
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header/>
          {children}
          {modal}
          <Footer/>
        </TanStackProvider>
      </body>
    </html>
  );
}
