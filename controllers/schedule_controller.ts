import { NextResponse } from 'next/server';
import { ScheduleData } from "@/interfaces"
import { addScheduleService } from '@/services';

// const getAllScheduleByUser = async (req: any, res: any) => {

// }

export const addScheduleController = async (scheduleData: ScheduleData) => {
  try {
    const { message, status } = await addScheduleService(scheduleData);
    return NextResponse.json({ message, status });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
