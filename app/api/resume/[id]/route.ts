import { BASE_URL } from "@/app/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get("access_token")?.value;
  const { id } = await params;

  const resumes = await fetch(`${BASE_URL}/resumes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resumes.ok) {
    return NextResponse.json(
      { message: "Failed to fetch resume" },
      { status: 500 }
    );
  }
  const data = await resumes.json();
  return NextResponse.json(data);
}
