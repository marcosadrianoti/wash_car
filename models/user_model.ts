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

export const addUserModel = async (sub: string, name: string, email: string): Promise<any> => {
  try {
    const result = await prisma.user.create(
      {
        data: {
          sub,
          name,
          email,
        }
      }
    );
    return result;
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}