import { Note, NoteTag } from "../types/note";
import axios, { AxiosResponse } from "axios";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: NoteTag;
}
const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = "", tag } = params;
  const queryParams: Record<string, string> = {
    page: String(page),
    perPage: String(perPage),
  };
  const trimmedSearch = typeof search === "string" ? search.trim() : "";
  if (trimmedSearch) {
    queryParams.search = trimmedSearch;
  }
  if (tag) {
    queryParams.tag = tag;
  }
  const config = {
    headers,
    params: queryParams,
  };
  const response = await axios.get<FetchNotesResponse>(BASE_URL, config);
  return response.data;
}

export async function createNote(note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const config = { headers };

  const response = await axios.post<Note>(BASE_URL, note, config);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const config = { headers };
  const response: AxiosResponse<Note> = await axios.delete(
    `${BASE_URL}/${id}`,
    config
  );
  return response.data;
}

export default async function fetchNoteById(id: string): Promise<Note> {
  const config = { headers };
  const response: AxiosResponse<Note> = await axios.get(
    `${BASE_URL}/${id}`,
    config
  );
  return response.data;
}

const DEFAULT_TAGS = ["Todo", "Personal", "Work", "Shopping", "Meeting"];

export async function getTags(): Promise<string[]> {
  const { notes } = await fetchNotes({ page: 1, perPage: 12 });
  const tagsFromNotes = Array.from(new Set(notes.map((note) => note.tag)));

  return Array.from(new Set([...DEFAULT_TAGS, ...tagsFromNotes]));
}
