import { ShiftCompositionDivider } from "./shift-composition-divider";
import { ShiftComposition } from "../../model/shift-composition";

describe('Test shift composition divider', () => {
  //Test data
  let substitutionCompositions  = getSubstitutionCompositions();
  let mainShiftComposition      = getMainComposition();

  const shiftCompositionDivider = new ShiftCompositionDivider();
  let dividedMainShiftCompositions = shiftCompositionDivider.divide(mainShiftComposition, substitutionCompositions);
  it('Result array consists of 2 elements', () => {
    expect(dividedMainShiftCompositions.length).toEqual(2);
  });
});

function getMainComposition() {
  let mainShiftComposition = new ShiftComposition();
  mainShiftComposition.employeeId = 1;
  mainShiftComposition.shiftId = 3;
  mainShiftComposition.substitution = false;
  mainShiftComposition.from = "2020-01-01";
  mainShiftComposition.to   = "2020-12-31";
  return mainShiftComposition;
}

function getSubstitutionCompositions() {
  let interval = new ShiftComposition();
  interval.employeeId = 1;
  interval.shiftId = 1;
  interval.substitution = true;
  interval.from = "2020-06-04";
  interval.to = "2020-06-09";

  let interval2 = new ShiftComposition();
  interval2.employeeId = 1;
  interval2.shiftId = 2;
  interval2.substitution = true;
  interval2.from = "2020-06-10";
  interval2.to = "2020-06-30";
  return [interval, interval2];
}
