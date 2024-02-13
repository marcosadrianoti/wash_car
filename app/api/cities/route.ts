import { getAllCitiesController } from '@/controllers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const res = await getAllCitiesController();
    const allCities = await res.json()
    return NextResponse.json(allCities);

  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}