export interface ScheduleData {
    userId: string;
    washTypeId: number;
    cityId: number;
    message?: string;
    scheduledDate: Date;
    payment: boolean;
  }
  