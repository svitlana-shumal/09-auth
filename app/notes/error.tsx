"use client";

import error from "./NotesClient.module.css";

export default function Error() {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
