
export interface MultiResult {
    locations: ResultLocation[];
    errors: string[];
    raw_only: boolean;
}

export interface ResultLocation {
    name: string;
    results: Result;
}

export interface Result {
    parsed_output: any[];
    raw_output: string;
    command?: string;
    location?: string;
    location_name?: string;
    raw_only: boolean;
}


