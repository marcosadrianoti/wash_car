import { ScheduleData } from "@/interfaces"
import { addScheduleModel } from "@/models";
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
