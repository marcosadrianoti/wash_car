import { getUserBySubService } from '@/services';
import { NextResponse } from 'next/server';

export const getUserBySubController = async (req: Request, sub: any): Promise<any> => {
  try {
    const { message, status } = await getUserBySubService(sub);
    return NextResponse.json({ message: message, status: status });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
};
