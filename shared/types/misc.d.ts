import type { CommandTypes } from "~~/constants";

export interface ApiPostBody {
  command: CommandTypes;     
  location: string;
  destination: string;
  timeout: number;
}