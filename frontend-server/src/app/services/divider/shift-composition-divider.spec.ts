import { ShiftCompositionDivider } from "./shift-composition-divider";
import { MainShiftComposition, SubstitutionShiftComposition } from "../../model/main-shift-composition";
import * as moment from 'moment';
import { Employee } from "../../model/employee";

describe('Test shift composition divider', () => {
  //Test data
  let substitutionCompositions  = getSubstitutionCompositions();
  let mainShiftComposition      = getMainComposition();

  const shiftCompositionDivider = new ShiftCompositionDivider();
  let dividedMainShiftCompositions = shiftCompositionDivider.divide(mainShiftComposition, substitutionCompositions);
  it('Result array consists of 2 elements', () => {
    expect(dividedMainShiftCompositions.length).toEqual(3);
  });
});

function getMainComposition() {
  let mainShiftComposition = new MainShiftComposition();
  mainShiftComposition.employee = <Employee> {id: 1};
  mainShiftComposition.shiftId = 3;
  mainShiftComposition.from = moment("2020-01-01");
  mainShiftComposition.to   = moment("2020-12-31");
  return mainShiftComposition;
}

function getSubstitutionCompositions() {
  let interval = new SubstitutionShiftComposition();
  interval.employee = <Employee> {id: 1};
  interval.shiftId = 1;
  interval.from = moment("2020-06-04");
  interval.to   = moment("2020-06-09");

  let interval2 = new SubstitutionShiftComposition();
  interval2.employee = <Employee> {id: 1};
  interval2.shiftId = 2;
  interval2.from  = moment("2020-06-10");
  interval2.to    = moment("2020-06-30");
  return [interval, interval2];
}
