import { Injectable } from "@angular/core";
import { Composition, MainShiftComposition, SubstitutionShiftComposition } from "../../model/main-shift-composition";
import { convertCompositionToInterval, RowInterval } from "../../model/ui/schedule-table/row-interval";
import { Row } from "../../model/ui/schedule-table/table-data";
import { EmployeeScheduleDTO } from "../../model/dto/employee-schedule-dto";
import { Moment } from "moment";

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
        if (from.isSameOrBefore(mainShiftComposition.to)) {
          const interval = {parentId: mainShiftComposition.id, from: from, to: to};
          result.push(interval);
        }
        break;
      }

      let substitutionComposition = substitutionCompositions[i];

      if (from.isSameOrAfter(substitutionComposition.from)) {
        if (substitutionComposition.to.isSameOrBefore(to)) {
          if (substitutionComposition.to.isSameOrAfter(from)) {
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

  getEmployeePositionIntervals(from: Moment,
                               to: Moment,
                               mainCompositions: MainShiftComposition[],
                               substitutionCompositions: SubstitutionShiftComposition[]) {
    let intervalsMap: Map<number, RowInterval[]> = new Map();

    let subs:SubstitutionShiftComposition[] = [].concat(substitutionCompositions);

    for (let composition of mainCompositions) {

      const otherPositionSubstitutions = [];

      for (let subIndex = 0; subIndex < subs.length;) {
        const subComposition = subs[subIndex];

        if (subComposition.from.isAfter(composition.to)) {
          break;
        }

        if (subComposition.positionId !== composition.positionId
          && intersect(subComposition, composition)) {
          otherPositionSubstitutions.push(subComposition);
          subIndex++;
          continue;
        }

        if (subComposition.positionId === composition.positionId
          && intersect(subComposition, composition)) {
          subs.splice(subIndex, 1);
        }
      }

      const positionIntervals = this.getRowIntervals(composition, otherPositionSubstitutions);
      const rowIntervals = intervalsMap.get(composition.positionId);
      if (rowIntervals) {
        positionIntervals.forEach(interval => rowIntervals.push(interval));
      } else {
        intervalsMap.set(composition.positionId, positionIntervals);
      }

    }

    for (let composition of subs) {
      if (composition.from.isAfter(to)) {
        break;
      }

      const positionInterval = convertCompositionToInterval(composition);
      const rowIntervals = intervalsMap.get(composition.positionId);
      if (rowIntervals) {
        rowIntervals.push(positionInterval);
      } else {
        intervalsMap.set(composition.positionId, [positionInterval]);
      }
    }

    return intervalsMap;
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

export function intersect(a: Composition, b: Composition) {
  return a.from.isBetween(b.from, b.to, undefined, '[]')
    || a.to.isBetween(b.from, b.to, undefined, '[]');
}
