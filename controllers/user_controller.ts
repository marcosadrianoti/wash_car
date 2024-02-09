import { addUserService, getUserBySubService } from '@/services';
import { NextResponse } from 'next/server';

export const getUserBySubController = async (req: Request, sub: any): Promise<any> => {
  try {
    const { message, status } = await getUserBySubService(sub);
    return NextResponse.json({ message: message, status: status });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}

export const addUserController = async (sub: string, name: string, email: string): Promise<any> => {
  try {
    const { message, status } = await addUserService(sub, name, email);
    return NextResponse.json({ message, status });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
