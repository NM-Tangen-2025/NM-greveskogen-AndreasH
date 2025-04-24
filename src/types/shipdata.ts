export interface ais {
    latitude: number;
    longtidude: number;
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
