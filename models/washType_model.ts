import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const getAllWashTypesModel = async (): Promise<any> => {
  try {
    const userData = await prisma.whash_Type.findMany();
    return userData;
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
