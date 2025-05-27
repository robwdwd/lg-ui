import type { Result } from "./results";

export interface TracerouteResult extends Result{
    parsed_output: TracerouteData[];
}

export interface TracerouteData {
    ip_address: string;
    hops: TracerouteHop[];
}

export interface IPAddressInfo {
    asn?: string 
    bgp_prefix?: string 
    as_name?: str 
    registry?: str
}

export interface TracerouteHop {
    hop_number?: string
    ip_address?: string
    rtt?: string
    fqdn?: string
    info?: IPAddressInfo
}
