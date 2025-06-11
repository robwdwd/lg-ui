export interface LocationSelect {
    label: string;
    value: string;
    server_id: string;
    icon: string;
}


export interface ApiLocation {
    code: string;
    name: string;
    region: string;
    country: string;
    country_iso: string;
    server_id: string;
}

export interface ApiRegions {
    name: string;
    locations: ApiLocation[];
}