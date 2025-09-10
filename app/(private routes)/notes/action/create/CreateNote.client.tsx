"use client";

import NoteForm from "@/components/NoteForm/NoteForm";
import { getTags } from "@/lib/api/serverApi";
import { NoteTag } from "@/types/note";
import { useQuery } from "@tanstack/react-query";

export default function CreateNoteClient() {
  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
  return <NoteForm tags={tags as NoteTag[]} />;
}
