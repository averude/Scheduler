import { Injectable } from "@angular/core";
import { Composition } from "../../model/main-shift-composition";
import { convertCompositionToInterval, RowInterval } from "../../model/ui/schedule-table/row-interval";
import { Row } from "../../model/ui/schedule-table/table-data";
import { EmployeeScheduleDTO } from "../../model/dto/employee-schedule-dto";

@Injectable()
export class CompositionDivider {

  getRowIntervals(mainShiftComposition: Composition,
                  substitutionShiftCompositions: Composition[]): RowInterval[] {
    let substitutionCompositions = substitutionShiftCompositions.sort((a,b) => a.from.diff(b.from));

    let result: RowInterval[] = [];

    let from  = mainShiftComposition.from;
    let to    = mainShiftComposition.to;

    let substCount = substitutionCompositions.length;

    for (let i = 0; i <= substCount; i++) {

      if (i >= substCount) {
        if (from.isBefore(mainShiftComposition.to)) {
          const interval = {parentId: mainShiftComposition.id, from: from, to: to};
          result.push(interval);
        }
        break;
      }

      let substitutionComposition = substitutionCompositions[i];

      if (from.isSameOrAfter(substitutionComposition.from)) {
        if (substitutionComposition.to.isSameOrBefore(to)) {
          if (substitutionComposition.to.isAfter(from)) {
            from = substitutionComposition.to.clone().add(1, 'day');
          }
          continue;
        } else {
          break;
        }
      }

      if (to.isAfter(substitutionComposition.from)) {
        const interval = {
          parentId: mainShiftComposition.id,
          from: from,
          to: substitutionComposition.from.clone().subtract(1, 'day')
        };

        result.push(interval);
        from = substitutionComposition.to.clone().add(1, 'day');
      } else {
        const interval = {parentId: mainShiftComposition.id, from: from, to: to};
        result.push(interval);
        break;
      }
    }

    return result;
  }

  getRowIntervalsByArr(mainCompositions: Composition[],
                       substCompositions: Composition[]): RowInterval[] {
    let result = [];

    mainCompositions.forEach(composition =>
      this.getRowIntervals(composition, substCompositions)
        .forEach(value => result.push(value)));

    return result;
  }

  recalculate(row: Row, dto: EmployeeScheduleDTO) {
    if (row.isSubstitution) {
      row.intervals = row.compositions.map(value => convertCompositionToInterval(value));
    } else {
      row.intervals = this.getRowIntervalsByArr(row.compositions, dto.substitutionShiftCompositions);
    }
  }
}
