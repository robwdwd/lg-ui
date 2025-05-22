import type { MultiResult, Result, ResultLocation } from "./results";

export interface MultiBgpResult extends MultiResult {
  locations: BgpLocation[];
}

export interface BgpLocation extends ResultLocation {
  results: BgpResult;
}

export interface BgpResult extends Result {
  parsed_output: BgpData[];
}

export interface BgpData {
  prefix: string;
  paths: BgpPath[];
  as_paths: number[][];
  asn_info: ASNInfo
}

export interface BgpPath {
  communities: BgpCommunity[]
  metric: string
  local_pref: string
  best_path: boolean
  next_hop: string
  as_path: string[]
}

export interface BgpCommunity {
  community: string
  description: string
}

export interface ASNOrganization {
  orgName: string;
}

export interface ASNCountry {
  iso: string;
  name: string;
}

export interface ASNInfoEntry {
  asnName: string;
  rank: number;
  organization: ASNOrganization;
  country: ASNCountry;
}

export interface ASNInfo {
  [asn: string]: ASNInfoEntry;
}