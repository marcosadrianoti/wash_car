// import { NextApiRequest, NextApiResponse } from 'next';
import { getUserBySubController } from '@/controllers';
import { NextResponse } from 'next/server';

export async function GET(req: Request, params:any) {
  const {sub} = params.params;
  try {
    const res = await getUserBySubController(req, sub);
    const userData = await res.json()
    return NextResponse.json(userData);

  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidor' });
  }
}
