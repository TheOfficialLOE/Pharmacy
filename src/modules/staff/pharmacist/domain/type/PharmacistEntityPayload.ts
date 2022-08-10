
export interface PharmacistEntityPayload {
    id?: string;
    name: string;
    email: string;
    password: string;
    joinedAt?: Date;
    updatedAt?: Date;
    todaySales?: {};
    currentPatientCode?: number;
}