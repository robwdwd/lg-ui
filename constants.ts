import type { Toast } from "@nuxt/ui/runtime/composables/useToast.js";

export const API_TIMEOUT_MULTICMD = 600000;

export type ApiTimeoutKey = 'ping' | 'traceroute' | 'bgp';

export const API_TIMEOUT: Record<ApiTimeoutKey, number> = {
  ping: 30000,
  traceroute: 300000,
  bgp: 30000,
};

export enum CommandTypes {
  BGP = 'bgp',
  PING = 'ping',
  TRACEROUTE = 'traceroute',
}

export const TOAST_MESSAGES = {
  info: {
    title: 'Information',
    description: 'Request sent, please wait for results.',
    color: 'info',
  } as Partial<Toast>,
  partial: {
    title: 'Warning',
    description: 'Some locations failed. Showing partial results.',
    color: 'warning',
  } as Partial<Toast>,
  error: {
    title: 'Error',
    description: 'An error occurred while processing your request.',
    color: 'error',
  } as Partial<Toast>,
} as const;