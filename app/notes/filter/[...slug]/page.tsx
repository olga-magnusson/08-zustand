import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { NoteTag } from "@/types/note";
import type { Metadata } from "next";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}


export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const slugArray = params.slug || [];
  const rawTag = slugArray[0];
  const tag: NoteTag | "all" = rawTag && rawTag !== "all" ? (rawTag as NoteTag) : "all";

  return {
    title: `Notes - ${tag} | NoteHub`,
    description: `Browse all ${tag} notes in NoteHub.`,
    openGraph: {
      title: `Notes - ${tag} | NoteHub`,
      description: `Browse all ${tag} notes in NoteHub.`,
      url: `https://your-vercel-domain.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub OG Image",
        },
      ],
    },
  };
}

export default async function FilterPage({ params }: FilterPageProps) {
  const queryClient = new QueryClient();

  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const rawTag = slugArray[0];
  const tag: NoteTag | "all" = rawTag && rawTag !== "all" ? (rawTag as NoteTag) : "all";

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag: tag === "all" ? undefined : tag,
        search: "",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}