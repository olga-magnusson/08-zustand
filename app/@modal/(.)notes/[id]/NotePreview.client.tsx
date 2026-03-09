"use client";

import { useRouter } from "next/navigation";
import NotePreview from "@/components/NotePreview/NotePreview";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import Modal from "../../default";

interface NotePreviewModalProps {
  params: { id: string };
}

export default function NotePreviewModal({ params }: NotePreviewModalProps) {

  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div style={{ position: "relative" }}>
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "transparent",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          ×
        </button>
        {isLoading && <p>Loading note...</p>}

        {isError && <p>Error loading note.</p>}

        {note && <NotePreview noteId={params.id} />}
      </div>
    </Modal>
  );
}