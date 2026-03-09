import type {Note, NoteTag} from '../types/note';
import axios from 'axios';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {Authorization: `Bearer ${token}`}
})


export interface FetchNotesResponse{
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async ({page = 1, perPage = 12, search = "", tag, }:{page: number, perPage: number, search: string, tag?: NoteTag | "all"}): Promise<FetchNotesResponse> => {
    const params: Record <string, string | number> = { page, perPage };
    
    if (tag && tag !== "all") params.tag = tag; 
    if (search) params.search = search;

    const response = await api.get<FetchNotesResponse>(`/notes`,{params});
    return response.data;
};

export async function fetchNoteById(id: string): Promise<Note> {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  }
  
  interface CreateNoteRequest {
    title: string;
    content: string;
    tag: NoteTag;
  }
  
  export const createNote = async (note: CreateNoteRequest): Promise<Note> => {
    const response = await api.post<Note>("/notes", note);
    return response.data;
  };
  
  export const deleteNote = async (id: string): Promise<Note> => {
    const response = await api.delete<Note>(`/notes/${id}`);
    return response.data;
  };