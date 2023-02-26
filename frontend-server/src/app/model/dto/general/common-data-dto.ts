import { DayType } from "../../day-type";
import { Shift } from "../../shift";
import { Employee } from "../../employee";
import { Position } from "../../position";

export class CommonDataDTO {
  dayTypes:  DayType[];
  positions: Position[];
  shifts:    Shift[];
  employees: Employee[];
}
