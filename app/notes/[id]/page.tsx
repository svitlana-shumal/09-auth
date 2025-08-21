// import NoteDetailsClient from "./NoteDetailsClient";
// import fetchNoteById from "@/lib/api";
// import { dehydrate, QueryClient } from "@tanstack/react-query";

// interface NotePageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function NoteDetails({ params }: NotePageProps) {
//   const { id } = await params;
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//   });
//   return (
//     <NoteDetailsClient noteId={id} dehydratedState={dehydrate(queryClient)} />
//   );
// }

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import fetchNoteById from "@/lib/api";
import NoteDetailsClient from "./NoteDetailsClient";

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
