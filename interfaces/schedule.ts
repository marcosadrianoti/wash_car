export interface ScheduleData {
  userId: string;
  washTypeId: number;
  cityId: number;
  message?: string;
  scheduledDate: Date | string;
  payment: boolean;
}

// export interface Schedule {
//   id: number,
//   userId: string,
//   washTypeId: number,
//   cityId: number,
//   message: string,
//   scheduledDate: string,
//   payment: boolean,
//   createdAt: string,
//   updatedAt: string
// }

export interface Schedule {
  id: number;
  userId: string;
  washTypeId: number;
  cityId: number;
  message: string;
  scheduledDate: string;
  payment: boolean;
  createdAt: string;
  updatedAt: string;
  washType?: WashType;
  user?: User;
  city?: City;
}

interface WashType {
  id: number;
  type: string;
  price: number;
}

interface User {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

