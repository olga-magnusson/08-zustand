import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content.slice(0, 160), // short description
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 160),
      url: `https://your-site.com/notes/${params.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}


export default async function NotePage({ params }: Props) {
  const noteId = params.id;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={noteId} />
    </HydrationBoundary>
  );
}