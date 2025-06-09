import type { CommandTypes } from "~~/constants";

export interface ApiPostBody {
  command: CommandTypes;
  location: string;
  destination: string;
  timeout: number;
}

export interface MultiApiPostBody {
  command: CommandTypes;
  locations: string[];
  destinations: string[];
  timeout: number;
}