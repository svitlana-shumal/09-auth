"use client";

import css from "./page.module.css";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
