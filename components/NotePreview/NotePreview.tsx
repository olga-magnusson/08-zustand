
"use client";

import css from "./NotePreview.module.css"
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false, 
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Error loading note.</p>;

  return (
    <div className={css.container}>
  <h2 className={css.title}>{note.title}</h2>
  <p className={css.content}>{note.content}</p>
  <p className={css.tag}>Tag: {note.tag}</p>
</div>
  );
}