import { Entity } from "#libs/ddd/base-classes/BaseEntity";

interface DrugEntityProps {
    supplierId: string;
    supplierOrganization: string;
    drugName: string;
    drugFamily: string;
    manufactureDate: Date;
    expirationDate: Date;
    suppliedAt?: Date;
    requiresDoctorPrescription: boolean;
    price: number;
    quantity: number;
}

export class Drug extends Entity<DrugEntityProps> {
    public static register(props: DrugEntityProps): Drug {
        props.suppliedAt = props.suppliedAt || new Date();
        return new Drug(props);
    }

    public get supplierId(): string {
        return this.props.supplierId;
    }

    public get supplierOrganization(): string {
        return this.props.supplierOrganization;
    }

    public get drugName(): string {
        return this.props.drugName;
    }

    public get drugFamily(): string {
        return this.props.drugFamily;
    }

    public get manufactureDate(): Date {
        return this.props.manufactureDate;
    }

    public get expirationDate(): Date {
        return this.props.expirationDate;
    }

    public get suppliedAt(): Date {
        return this.props.suppliedAt;
    }

    public get requiresDoctorPrescription(): boolean {
        return this.props.requiresDoctorPrescription;
    }

    public get price(): number {
        return this.props.price;
    }

    public get quantity(): number {
        return this.props.quantity;
    }

    public charge(quantity: number): void {
        if (quantity < 1)
            throw new Error("Quantity should be 1 or greater") ;
        this.props.quantity += quantity;
    }

    public sell(quantity: number): void {
        if (quantity < 1)
            throw new Error("Quantity should be 1 or greater") ;
        if (this.quantity - quantity <= 0)
            throw new Error("Not enough drug in inventory");
        this.props.quantity -= quantity;
    }

    public validate(): void {
        /// ...
    }
}