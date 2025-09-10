import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";

export async function POST(request: NextRequest) {
  // Отримуємо дані з тіла запиту
  const body = await request.json();

  try {
    // Передаємо їх далі на бекенд нотаток
    const { data } = await api.post("/notes", body);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status }
    );
  }
}
