export interface Course {
  id?: number;
  name: string;
  description: string;
  type: string;
  date: Date;
  durationInSeconds: number;
  topRated: boolean;
}
