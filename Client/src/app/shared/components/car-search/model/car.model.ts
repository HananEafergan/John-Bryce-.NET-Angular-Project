import { Branch } from "../../../../features/admin/components/manage-branches/model/branch.model";

export interface Car {
    CarID: string;
    TypeID: string;
    CarType: CarType;
    CurrentMileage: string;
    Image?: string;
    IsAvailable: boolean;
    IsOperational: boolean;
    LicensePlate: string;
    BranchID: string;
    Branch: Branch;
}

export interface CarType {
    TypeID?: string;
    Manufacturer: string;
    Model: string;
    DailyRate: number;
    LateReturnFee: number;
    YearOfManufacture: number;
    GearType: string;
}