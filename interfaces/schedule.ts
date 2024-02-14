export interface ScheduleData {
    userId: string;
    washTypeId: number;
    cityId: number;
    message?: string;
    scheduledDate: Date | string;
    payment: boolean;
  }
  