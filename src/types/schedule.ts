export interface ScheduleData {
  startDateTime: string;
  endDateTime: string;
  title: string;
  description: string;
}

export interface ScheduleResponse extends ScheduleData {
  id: number;
}
