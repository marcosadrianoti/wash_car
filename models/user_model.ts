import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const getUserBySubModel = async (sub: any): Promise<any> => {
  try {
    const userData = await prisma.user.findUnique(
      {
        where: { sub: sub },
      }
    );
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidor' });
  }
  // return {type: null | 'error', message: data, status: statusCode };
}
