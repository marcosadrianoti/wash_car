import { getUserBySubModel } from "@/models";
import { NextResponse } from "next/server";

export const getUserBySubService = async (sub: any): Promise<any> => {
  try {
    const res = await getUserBySubModel(sub);
    // const userData = await res.json();
    // const userData = res;
    if (!res) {
      return { message: 'User not found', status: 404 };
    }
    return { message: res, status: 200 };
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
