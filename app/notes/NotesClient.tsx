"use client";

import css from "./NotesClient.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Loader from "./loading";
import ErrorMessage from "./error";
import EmptyState from "./empty";

export default function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useQuery<FetchNotesResponse>(
    {
      queryKey: ["notes", page, debouncedSearch],
      queryFn: () => fetchNotes(debouncedSearch, page),
      placeholderData: (prev) => prev,
    }
  );
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {(isLoading || isFetching) && <Loader />}

      {isError && <ErrorMessage />}
      {!data?.notes?.length && !isLoading && !isError && (
        <EmptyState message="No results found." />
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
