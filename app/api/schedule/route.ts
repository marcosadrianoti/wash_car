import { addScheduleController } from "@/controllers";
import { NextResponse } from "next/server";
import { ScheduleData } from "@/interfaces";

export async function POST(req: Request) {
  const {
    userId,
    washTypeId,
    cityId,
    message,
    scheduledDate,
    payment
  } = await req.json();
  try {
    const schedulingData: ScheduleData = {
      userId,
      washTypeId,
      cityId,
      message,
      scheduledDate,
      payment
    }
    const res = await addScheduleController(schedulingData)
    const scheduleData = await res.json();
    return NextResponse.json(scheduleData);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
