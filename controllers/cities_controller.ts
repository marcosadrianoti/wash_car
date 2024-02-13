import { NextResponse } from 'next/server';
import { getAllCitiesService } from '@/services';

export const getAllCitiesController = async () => {
  try {
    const { message, status } = await getAllCitiesService();
    return NextResponse.json({ message, status });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
