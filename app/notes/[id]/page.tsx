
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

interface Props {
  params: { id: string };
}

export default async function NotePage({ params }: Props) {
  const note: Note = await fetchNoteById(params.id);

  return (
    <div>
      <NotePreview note={note} />
    </div>
  );
}