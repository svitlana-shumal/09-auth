import { Note } from "../types/note";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotes(
  search: string,
  page: number = 1,
  perPage: number = 12
): Promise<FetchNotesResponse> {
  const params: Record<string, unknown> = {
    page: String(page),
    perPage: String(perPage),
  };
  if (search.trim()) {
    params.search = search;
  }
  const config = {
    params,
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const response = await axios.get<FetchNotesResponse>(BASE_URL, config);
  return response.data;
}

export async function createNote(note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await axios.post<Note>(BASE_URL, note, config);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response: AxiosResponse<Note> = await axios.delete(
    `${BASE_URL}/${id}`,
    config
  );
  return response.data;
}

const getAuthConfig = (): AxiosRequestConfig => {
  return {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
};
export default async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await axios.get(
    `${BASE_URL}/${id}`,
    getAuthConfig()
  );
  return response.data;
}
