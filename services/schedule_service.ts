import { ScheduleData } from "@/interfaces"
import { addScheduleModel, getAllSchedulesByUserIdModel } from "@/models";
import { NextResponse } from "next/server";

export const addScheduleService = async (scheduleData: ScheduleData): Promise<any> => {
  try {
    const res = await addScheduleModel(scheduleData);
    if (res.status == 500) {
      return { message: res.message, status: 500 };
    }
    return { message: res, status: 201 };
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}

export const getAllSchedulesByUserIdService = async (userId: string): Promise<any> => {
  try {
    const res = await getAllSchedulesByUserIdModel(userId);
    if (!res) {
      return { message: 'Schedules not found', status: 404 };
    }
    return { message: res, status: 200 };
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
