import type { Unit, UnitStatus } from '../../types.ts';

export interface ProjectRecord {
    id: string;
    name: string;
    developer: string;
    year: number;
    station: string;
    walkTime: number;
    floors: number;
    units: string;
    priceRangeRent: string;
    priceRangeSale: string;
    imageUrl: string;
}

export interface ProjectFormState {
    name: string;
    developer: string;
    year: string;
    station: string;
    walkTime: string;
    floors: string;
    units: string;
    priceRangeRent: string;
    priceRangeSale: string;
    imageUrl: string;
}

export type UnitRecord = Omit<Unit, 'id'> & { id: string };

export interface UnitFormState {
    projectId: string;
    name: string;
    bedrooms: string;
    bathrooms: string;
    size: string;
    price: string;
    status: UnitStatus;
}
