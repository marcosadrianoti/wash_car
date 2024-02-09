import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ScheduleData } from "@/interfaces"

export const addScheduleModel = async (scheduleData: ScheduleData): Promise<any> => {
  const { userId, washTypeId, cityId, message, scheduledDate } = scheduleData;
  try {
    const newSchedule = await prisma.schedule.create({
      data: {
        userId: userId,
        washTypeId: washTypeId,
        cityId: cityId,
        message: message,
        scheduledDate: scheduledDate, // new Date('2024-02-10T08:00:00Z')
        payment: false
      }
    });
    return newSchedule;
  } catch (error) {
    return { message: error, status: 500 };
  }
}
