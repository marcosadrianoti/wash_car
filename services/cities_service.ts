import { getAllCitiesModel } from "@/models";
import { NextResponse } from "next/server";

export const getAllCitiesService = async (): Promise<any> => {
    try {
      const res = await getAllCitiesModel();
      if (!res) {
        return { message: 'Cities not found', status: 404 };
      }
      return { message: res, status: 200 };
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error', status: 500 });
    }
  }
