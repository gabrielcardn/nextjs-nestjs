// Importe os módulos necessários do Next.js e outros que você possa precisar

import usersJson from "@/app/users/users.json";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userFound = usersJson.find((u) => u.id === parseInt(id));
    return NextResponse.json({ data: userFound, status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
