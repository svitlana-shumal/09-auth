import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const tag = slug?.[0] === "All" ? undefined : (slug?.[0] as NoteTag);
  return {
    title: `${tag} notes`,
    description: `All ${tag} notes`,
    openGraph: {
      title: `${tag} notes`,
      description: `All ${tag} notes`,
      url: `https://08-zustand-liart-two.vercel.app/notes/filter/${tag}`,
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
}

export default async function NotesPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug ?? [];
  const queryClient = new QueryClient();
  const tag = slug[0] === "All" ? undefined : (slug[0] as NoteTag);

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes("", 1, 9, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
