import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    return NextResponse.json(
      { message: `Get quizzes for article ${id}` },
      { status: 200 },
    );
  } catch (error) {
    return new Response("Not available to get quizzes!!!", { status: 400 });
  }
}
