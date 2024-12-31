import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const note = await prisma.note.findFirst({
      where: { id: Number(params.id) },
    });
    if (!note)
      return NextResponse.json({
        message: `Note with id ${params.id} not found`,
        status: 404,
      });
    return NextResponse.json({ message: `GET /api/notes/${params.id}`, note });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message, status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { title, content } = await request.json();
  try {
    const note = await prisma.note.update({
      where: { id: Number(params.id) },
      data: { title, content },
    });
    return NextResponse.json({ message: `PUT /api/notes/${params.id}`, note });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === "P2025")
        return NextResponse.json({
          message: `Note with id ${params.id} not found`,
          status: 404,
        });
      else return NextResponse.json({ message: error.message, status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const note = await prisma.note.delete({ where: { id: Number(params.id) } });
    if (!note)
      return NextResponse.json({
        message: `Note with id ${params.id} not found`,
        status: 404,
      });
    return NextResponse.json({ message: `DELETE /api/notes/${params.id}` });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      if (error.code === "P2025")
        return NextResponse.json({
          message: `Note with id ${params.id} not found`,
          status: 404,
        });
      else return NextResponse.json({ message: error.message, status: 500 });
  }
}
