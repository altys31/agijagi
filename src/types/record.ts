export type RecordType = '대변' | '소변' | '수면' | '식사' | '유축' | '약';

export interface RecordData {
  type: RecordType;
  latestDateTime: string | null;
}

export interface RecordRequest {
  type: RecordType;
  startDateTime: string;
  endDateTime: string | null;
}

export interface RecordMenu extends RecordData {
  icon: string;
  color: string;
}

export interface RecordResponse extends RecordRequest {
  id: number;
}
