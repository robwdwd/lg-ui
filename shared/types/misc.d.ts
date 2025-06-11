import type { CommandTypes } from "~~/constants";

export interface ApiPostBody {
  command: CommandTypes;
  location: string;
  destination: string;
  serverId: string;
  timeout: number;
}

export interface MultiApiPostBody {
  command: CommandTypes;
  locations: string[];
  destinations: string[];
  serverId: string;
  timeout: number;
}