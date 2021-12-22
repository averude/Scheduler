import { Injectable } from "@angular/core";
import { Composition, MainComposition, SubstitutionComposition } from "../../model/composition";
import { convertCompositionToInterval, RowInterval } from "../../model/ui/schedule-table/row-interval";
import { ScheduleRow } from "../../model/ui/schedule-table/table-data";
import { EmployeeScheduleDTO } from "../../model/dto/employee-schedule-dto";
import { Moment } from "moment";

@Injectable()
export class IntervalCreator {

  getEmployeeShiftIntervals(mainComposition: Composition,
                            substitutionCompositions: Composition[]): RowInterval[] {
    let sortedSubCompositions = substitutionCompositions.sort((a,b) => a.from.diff(b.from));

    let result: RowInterval[] = [];

    let from  = mainComposition.from;
    let to    = mainComposition.to;

    let substCount = sortedSubCompositions.length;

    for (let i = 0; i <= substCount; i++) {

      if (i >= substCount) {
        if (from.isSameOrBefore(mainComposition.to)) {
          const interval = {parentId: mainComposition.id, from: from, to: to};
          result.push(interval);
        }
        break;
      }

      let substitutionComposition = sortedSubCompositions[i];

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

      if (to.isSameOrAfter(substitutionComposition.from)) {
        const interval = {
          parentId: mainComposition.id,
          from: from,
          to: substitutionComposition.from.clone().subtract(1, 'day')
        };

        result.push(interval);
        from = substitutionComposition.to.clone().add(1, 'day');
      } else {
        const interval = {parentId: mainComposition.id, from: from, to: to};
        result.push(interval);
        break;
      }
    }

    return result;
  }

  getEmployeePositionIntervals(from: Moment,
                               to: Moment,
                               mainCompositions: MainComposition[],
                               substitutionCompositions: SubstitutionComposition[]): Map<number, RowInterval[]> {
    const intervalsMap: Map<number, RowInterval[]> = new Map();

    const tempSubstitutions:SubstitutionComposition[] = [].concat(substitutionCompositions);

    for (let composition of mainCompositions) {

      const otherPositionSubstitutions = [];

      for (let subIndex = 0; subIndex < tempSubstitutions.length;) {
        const subComposition = tempSubstitutions[subIndex];

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
          tempSubstitutions.splice(subIndex, 1);
        }
      }

      const positionIntervals = this.getEmployeeShiftIntervals(composition, otherPositionSubstitutions);
      const rowIntervals = intervalsMap.get(composition.positionId);
      if (rowIntervals) {
        positionIntervals.forEach(interval => rowIntervals.push(interval));
      } else {
        intervalsMap.set(composition.positionId, positionIntervals);
      }

    }

    for (let composition of tempSubstitutions) {
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

  getEmployeeShiftIntervalsByArr(mainCompositions: Composition[],
                                 substCompositions: Composition[]): RowInterval[] {
    let result = [];

    mainCompositions.forEach(composition =>
      this.getEmployeeShiftIntervals(composition, substCompositions)
        .forEach(value => result.push(value)));

    return result;
  }

  recalculate(row: ScheduleRow, dto: EmployeeScheduleDTO) {
    if (row.value.isSubstitution) {
      row.value.intervals = row.value.compositions.map(value => convertCompositionToInterval(value));
    } else {
      row.value.intervals = this.getEmployeeShiftIntervalsByArr(row.value.compositions, dto.substitutionCompositions);
    }
  }
}

export function intersect(a: Composition, b: Composition) {
  return a.from.isBetween(b.from, b.to, undefined, '[]')
    || a.to.isBetween(b.from, b.to, undefined, '[]');
}
