import { Car } from "../../../../../shared/components/car-search/model/car.model";
import { User } from "../../../../../shared/models/user.model";
import { Rental } from "../../../../user/models/rental.model";

export class ManageRentalsObj{
    Cars!: Car[];
    Users!: User[];
    Rentals!: Rental[];
}