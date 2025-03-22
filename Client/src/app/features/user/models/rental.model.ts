import { Car } from "../../../shared/components/car-search/model/car.model";
import { User } from "../../../shared/models/user.model";

export interface Rental {
    RentalID?: number;
    UserID: number;
    User?: User;
    CarID: number;
    Car?: Car;
    StartDate: Date;
    ExpectedReturnDate: Date;
    ActualReturnDate?: Date;
    TotalCost: number;
    Status: string;
}