import css from "./CreateNote.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CreateNoteClient from "./CreateNote.client";
import { Metadata } from "next";
import { getTags } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Create note",
  description: "Page for create a new note",
  openGraph: {
    title: "Create note",
    description: "Page for create a new note",
    url: "https://08-zustand-liart-two.vercel.app/notes/action/create",
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
export default async function CreateNote() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <HydrationBoundary state={dehydratedState}>
          <CreateNoteClient />
        </HydrationBoundary>
      </div>
    </main>
  );
}
