import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { FetchNotesResponse } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { NoteTag } from "@/types/note";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: FilterPageProps) {
  const queryClient = new QueryClient();

  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const rawTag = slugArray[0];
  const tag: NoteTag | undefined =
  rawTag && rawTag !== "all" ? (rawTag as NoteTag) : undefined;

  // Corrected fetchNotes call
  const initialNotes: FetchNotesResponse = await fetchNotes({
    page: 1,
    perPage: 12,
    tag: tag,
    search: "",
  });

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, tag || "all"],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag: tag,
        search: "",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialNotes={initialNotes} tag={tag || "all"} />
    </HydrationBoundary>
  );
}