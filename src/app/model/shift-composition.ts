import * as moment from "moment";

export class ShiftComposition {
  id: number;
  employeeId: number;
  shiftId: number;
  substitution: boolean;
  from: string;
  to: string;
}

export const SS: ShiftComposition[] = [
  {id: 3, employeeId: 1, shiftId: 1, substitution: false, from: '2018-01-01', to: '2019-12-31'},
  {id: 1, employeeId: 1, shiftId: 14, substitution: true, from: '2019-11-01', to: '2019-11-05'},
  {id: 2, employeeId: 1, shiftId: 14, substitution: true, from: '2019-11-15', to: '2019-11-24'},
  // {id: 2, employeeId: 1, shiftId: 18, substitution: true, from: '2019-11-13', to: '2019-11-24'},
  {id: 3, employeeId: 24, shiftId: 1, substitution: false, from: '2019-01-01', to: '2019-12-31'},
  // {id: 1, employeeId: 24, shiftId: 14, substitution: true, from: '2019-11-06', to: '2019-11-11'},
  // {id: 2, employeeId: 24, shiftId: 14, substitution: true, from: '2019-11-15', to: '2019-11-24'},
  // {id: 1, employeeId: 24, shiftId: 18, substitution: true, from: '2019-11-11', to: '2019-11-12'},
  {id: 3, employeeId: 28, shiftId: 1, substitution: false, from: '2019-01-01', to: '2019-12-31'},
  // {id: 3, employeeId: 28, shiftId: 18, substitution: true, from: '2019-01-01', to: '2019-12-31'},
  // {id: 1, employeeId: 28, shiftId: 14, substitution: true, from: '2019-11-11', to: '2019-11-12'},
  // {id: 2, employeeId: 28, shiftId: 14, substitution: true, from: '2019-11-13', to: '2019-11-24'},
];

export function getShiftScheduleByDates(from, to) {
  let from_date = moment(from);
  let to_date = moment(to);
  return SS.filter(value => from_date.isBefore(moment(value.to)) && to_date.isAfter(moment(value.from)))
}
