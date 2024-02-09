import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    userId,
    washTypeId,
    cityId,
    message,
    scheduledDate,
    payment
  } = await req.json();
  const schedulingData = {
    userId,
    washTypeId,
    cityId,
    message,
    scheduledDate,
    payment
  }
  try {
    const res = await addScheduleController(schedulingData)
    const scheduleData = await res.json();
    return NextResponse.json(scheduleData);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 });
  }
}
