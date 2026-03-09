"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal"; 
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";


interface NotesClientProps {
  tag: NoteTag | "all";
}

export default function NotesClient({ tag }: NotesClientProps) {
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
  });

  const totalPages: number = data?.totalPages ?? 1;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Кнопка для створення нової нотатки */}
      <button onClick={openModal}>Create Note</button>

      {/* Пошуковий інпут */}
      <SearchBox value={search} onSearch={setSearch} />

      {/* Стан завантаження/помилки */}
      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}

      {/* Список нотаток */}
      {data && <NoteList notes={data.notes} />}

      {/* Пагінація */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Модальне вікно для створення нотатки */}
      {isModalOpen && (
        <Modal  onClose={closeModal}>
          <NoteForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}