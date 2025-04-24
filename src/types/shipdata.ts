export interface ais {
    latitude: number;
    longitude: number; // Corrected typo: longtidude -> longitude
    course: number;
    mmsi: number;
    msgtime: string;
}

export interface ship {
    mmsi: number;
    shipName: string; // Changed from shipname to shipName
    callSign: string;
    vesselType: string;
}
