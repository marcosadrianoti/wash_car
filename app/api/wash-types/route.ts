import { getAllWashTypesController } from '@/controllers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const res = await getAllWashTypesController();
    const allWashTypes = await res.json()
    return NextResponse.json(allWashTypes);

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}