import { addUserModel, getUserBySubModel } from "@/models";
import { NextResponse } from "next/server";

export const getUserBySubService = async (sub: any): Promise<any> => {
  try {
    const res = await getUserBySubModel(sub);
    if (!res) {
      return { message: 'User not found', status: 404 };
    }
    return { message: res, status: 200 };
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}

export const addUserService = async (sub: string, name: string, email: string): Promise<any> => {
  try {
    const res = await addUserModel(sub, name, email);
    const userData = await res.json();
    const { message, status } = userData;
    return { message, status };
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}