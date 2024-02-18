import { NextResponse } from 'next/server';
import { ScheduleData } from "@/interfaces"
import { addScheduleService, getAllSchedulesByUserIdService } from '@/services';
import { z } from 'zod';

const getErros = (erros: any[]) => {
  const errorMessages: { [x: string]: any; }[] = [];
  const result = erros.map((error: any) => {
    const { path, message } = error;
    errorMessages.push({ [`${path}Error`]: message });
  })
  return errorMessages;
}

export const addScheduleController = async (scheduleData: ScheduleData) => {
  const newScheduleSchema = z.object({
    userId: z.string(),
    washTypeId: z.number().positive({ message: 'Wash type is required' }),
    cityId: z.number().positive({ message: 'City is required' }),
    message: z.string().optional(),
    scheduledDate: z.string().min(1, { message: 'Scheduled date is required' }),
    payment: z.boolean().default(false)
  })
  const result = newScheduleSchema.safeParse(scheduleData);

  if (!result.success) {
    const errorsList = getErros(result.error.errors);
    return NextResponse.json({ message: errorsList, status: 400 });
  }
  try {
    const { message, status } = await addScheduleService(scheduleData);
    return NextResponse.json({ message, status });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}

export const getAllSchedulesByUserIdController = async (userId: string) => {
  try {
    const res = await getAllSchedulesByUserIdService(userId);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
