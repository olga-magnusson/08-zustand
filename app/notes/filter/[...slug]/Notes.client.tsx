"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes} from "@/lib/api";
import type { NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal"; 
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import type { FetchNotesResponse } from "@/lib/api";


interface NotesClientProps {
  tag: NoteTag | "all";
  initialNotes?: FetchNotesResponse; 
}

export default function NotesClient({ tag, initialNotes }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);


  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, tag, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        tag: tag === "all" ? undefined : tag,
        search: debouncedSearch,
      }),
    staleTime: 1000 * 60,
    initialData: initialNotes,
  });

  const totalPages: number = data?.totalPages ?? 1;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
  
      <button onClick={openModal}>Create Note</button>

      <SearchBox value={search} onSearch={setSearch} />

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}

      {data && <NoteList notes={data.notes} />}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {isModalOpen && (
        <Modal  onClose={closeModal}>
          <NoteForm  />
        </Modal>
      )}
    </div>
  );
}