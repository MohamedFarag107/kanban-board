import { Status } from "./board-status";

export interface Member {
  id: number;
  name: string;
  title: string;
  age: number;
  email: string;
  mobile_number: string;
  status: Status;
  order: string;
}
