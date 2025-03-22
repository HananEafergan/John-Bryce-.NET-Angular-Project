import { Car } from "../../../../../shared/components/car-search/model/car.model";
import { Branch } from "../../manage-branches/model/branch.model";

export interface ManageCarsObj{
    branches: Branch[];
    cars: Car[]
}