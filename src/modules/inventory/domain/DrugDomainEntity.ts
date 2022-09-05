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

    public charge(amount: number): void {
        this.props.quantity += amount;
    }

    public sell(amount: number): void {
        if (this.props.quantity - amount <= 0) {
            throw new Error("...")
        }
        this.props.quantity -= amount;
    }

    public validate(): void {
        /// ...
    }
}