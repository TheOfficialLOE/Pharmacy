import { Drug } from "#modules/inventory/domain/DrugDomainEntity";

export class SearchResponseDto {
    public drugId: string;
    public drugName: string;
    public drugFamily: string;
    public supplierOrganization: string;
    public manufactureDate: Date;
    public expirationDate: Date;
    public requiresDoctorPrescription: boolean;
    public price: number;

    constructor(drug: Drug) {
        this.drugId = drug.id.value;
        this.drugName = drug.drugName;
        this.drugFamily = drug.drugFamily;
        this.supplierOrganization = drug.supplierOrganization;
        this.manufactureDate = drug.manufactureDate;
        this.expirationDate = drug.expirationDate;
        this.requiresDoctorPrescription = drug.requiresDoctorPrescription;
        this.price = drug.price;
    }
}