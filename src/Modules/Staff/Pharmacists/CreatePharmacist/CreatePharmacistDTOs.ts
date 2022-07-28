
export interface CreatePharmacistRequestDTO {
    name: string;
    password: string;
}

export interface CreatePharmacistResponseDTO {
    id: string;
    name: string;
    dateJoined: Date;
}