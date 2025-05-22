import type { MultiResult, Result, ResultLocation } from "./results";

export interface MultiPingResult extends MultiResult {
    locations: PingLocation[];
}

export interface PingLocation extends ResultLocation {
    results: PingResult;
}

export interface PingResult extends Result {
    parsed_output: PingData[];
}

export interface PingData {
    ip_address: string
    packet_loss: number
    rtt_min: string
    rtt_avg: string
    rtt_max: string
    packet_count: string
    packet_size: string
}
