import { getUserBySubService } from '@/services';
import { NextResponse } from 'next/server';

export const getUserBySubController = async (req: Request, sub: any): Promise<any> => {
  try {
    const res = await getUserBySubService(sub);
    const userData = await res.json()
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidorrr' });
  }
};
