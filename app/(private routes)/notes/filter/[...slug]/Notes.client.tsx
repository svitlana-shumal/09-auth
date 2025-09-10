"use client";

import css from "./Notes.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchNotesClient, FetchNotesResponse } from "@/lib/api/clientApi";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Loader from "@/app/loading";
import ErrorMessage from "./error";
import EmptyState from "./empty";
import { NoteTag } from "@/types/note";
import Link from "next/link";

interface NotesClientProps {
  tag?: NoteTag;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError, error } =
    useQuery<FetchNotesResponse>({
      queryKey: ["notes", page, debouncedSearch, tag],
      queryFn: () => fetchNotesClient(debouncedSearch, page, 9, tag),
      placeholderData: (prevData) => prevData,
    });
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button} role="button">
          Create note +
        </Link>
      </header>

      {(isLoading || isFetching) && <Loader />}

      {isError && <ErrorMessage error={error} />}
      {!data?.notes?.length && !isLoading && !isError && (
        <EmptyState message="No results found." />
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
