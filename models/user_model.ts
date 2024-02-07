import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const getUserBySubModel = async (sub: any): Promise<any> => {
  try {
    const userData = await prisma.user.findUnique(
      {
        where: { sub: sub },
      }
    );
    return userData;
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
