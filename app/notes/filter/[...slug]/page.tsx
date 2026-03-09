import {fetchNotes} from "@/lib/api";
import NotesClient from "./Notes.client";
import type { FetchNotesResponse } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface FilterPageProps {params: Promise<{slug: string[]}>};

export default async function FilterPage({params}: FilterPageProps) {
    const queryClient = new QueryClient();

    const resolvedParams = await params;
    const slugArray = resolvedParams.slug || [];
    const tag = slugArray[0] === "all" ? undefined : slugArray[0];

    const initialNotes:FetchNotesResponse = await fetchNotes(1, 12, tag|| "");

    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, tag || "all"],
        queryFn: () => fetchNotes(1, 12,tag || ""),
    });

    return (<HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient initialNotes={initialNotes} tag={tag || "all"}/>
    </HydrationBoundary>
    );
}