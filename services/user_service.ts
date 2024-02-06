import { getUserBySubModel } from "@/models";
import { NextResponse } from "next/server";

export const getUserBySubService = async (sub: any): Promise<any> => {
  try {
    const res = await getUserBySubModel(sub);
    const userData = await res.json();
    // return NextResponse.json({type: null | 'error', message: data, status: statusCode });
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidor' });
  }
}
