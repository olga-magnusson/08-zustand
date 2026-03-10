"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";
import type { FetchNotesResponse } from "@/lib/api";

interface NotesClientProps {
  tag: NoteTag | "all";
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); 
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search); 
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

  return (
    <div>
      <Link href="/notes/action/create">
        <button>Create Note</button>
      </Link>

      <SearchBox value={search} onSearch={handleSearchChange} />

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}

      {data && <NoteList notes={data.notes} />}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}