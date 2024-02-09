import { ScheduleData } from "@/interfaces"
import { addScheduleModel } from "@/models";
import { NextResponse } from "next/server";

export const addScheduleService = async (scheduleData: ScheduleData): Promise<any> => {
    try {
      const res = await addScheduleModel(scheduleData);
      const teste = await res.json();
      console.log('res ===>', teste);
      
    //   if (res) {
    //     return { message: 'Error when adding the new schedule to the database', status: 400 }
    //   }
      return { message: teste.message, status: 201 };
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error', status: 500 });
    }
  }
