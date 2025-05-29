import type { ASNInfoEntry } from "./bgpresult";
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
    asrank?: ASNInfoEntry 
    registry?: str
    as_cc?: str
}

export interface TracerouteHop {
    hop_number?: string
    ip_address?: string
    rtt?: string
    fqdn?: string
    info?: IPAddressInfo
}
