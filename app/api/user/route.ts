import { getUserBySubController, addUserController } from '@/controllers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sub = searchParams.get('sub')
  if (!sub || sub == '') {
    return NextResponse.json({ error: "'sub' parameter not found in URL" });
  }

  try {
    const res = await getUserBySubController(req, sub);
    const userData = await res.json()
    return NextResponse.json(userData);

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}

export async function POST(req: Request) {
  const {sub, name, email} = await req.json();
  try {
    const res = await addUserController(sub, name, email);
    const userData = await res.json()
    return NextResponse.json(userData);

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
