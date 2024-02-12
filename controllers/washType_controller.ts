import { NextResponse } from 'next/server';
import { getAllWashTypesService } from '@/services';

export const getAllWashTypesController = async () => {
  try {
    const { message, status } = await getAllWashTypesService();
    return NextResponse.json({ message, status });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
