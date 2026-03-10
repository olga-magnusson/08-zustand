import Link from 'next/link';
import css from "./page.module.css"

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Not Found - NoteHub",
    description: "The page you are looking for does not exist on NoteHub",
    openGraph: {
      title: "Page Not Found - NoteHub",
      description: "The page you are looking for does not exist on NoteHub",
      url: "https://your-vercel-domain.vercel.app/not-found",
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
  

const NotFound = () => {
    return(
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">Go back home</Link>
        </div>
    );
};

export default NotFound;