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
  washType?: WashType; // Propriedade washType opcional do tipo WashType
}

interface WashType {
  id: number;
  type: string;
  // Outras propriedades do tipo de lavagem, se houver
}

