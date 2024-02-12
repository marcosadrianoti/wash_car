import { getAllWashTypesModel } from "@/models";
import { NextResponse } from "next/server";

export const getAllWashTypesService = async (): Promise<any> => {
    try {
      const res = await getAllWashTypesModel();
      if (!res) {
        return { message: 'Wash Types not found', status: 404 };
      }
      return { message: res, status: 200 };
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error', status: 500 });
    }
  }
