// "use client";

import type { Metadata } from "next";
import css from "./page.module.css";
// import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page not-found",
  openGraph: {
    title: "Page Not Found",
    description: "This page not-found",
    url: "https://08-zustand-liart-two.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub Logo",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
