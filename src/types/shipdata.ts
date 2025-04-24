export interface ais {
    latitude: number;
    longitude: number; // Corrected typo: longtidude -> longitude
    course: number;
    mmsi: number;
    msgtime: string;
}

export interface ship {
    mmsi: number;
    shipname: string;
    callSign: string;
    vesselType: string;
}
