import { roundToTwo } from "./utils";
import { WorkDay } from "../../model/workday";

export function convertTimeStringToMin(time: string): number {
  if (time) {
    let timeParts = time.split(':');
    let hh = Number.parseInt(timeParts[0]);
    let mm = Number.parseInt(timeParts[1]);

    if (hh >= 0 && hh <= 24 && mm >= 0 && mm <= 59) {
      return hh * 60 + mm;
    } else {
      return 0;
    }
  } else {
    return null;
  }
}

export function calculateWorkHoursByTimeStrings(startTime: string,
                                                endTime: string,
                                                breakStartTime: string,
                                                breakEndTime: string): number {
  if (startTime && endTime) {
    let start = convertTimeStringToMin(startTime);
    let end   = convertTimeStringToMin(endTime);
    let brk_s = convertTimeStringToMin(breakStartTime);
    let brk_e = convertTimeStringToMin(breakEndTime);

    return roundToTwo((end - start - (brk_e - brk_s)) / 60);
  } else {
    return 0;
  }
}

export function calculateWorkHoursByWorkDay(workDay: WorkDay): number {
  return calculateWorkHoursByTime(workDay.startTime, workDay.endTime, workDay.breakStartTime, workDay.breakEndTime);
}

export function calculateWorkHoursByTime(startTime: number,
                                         endTime: number,
                                         breakStartTime: number,
                                         breakEndTime: number): number {
  if (startTime >= 0 && endTime > startTime) {
    return roundToTwo((endTime - startTime - (breakStartTime && breakEndTime ? (breakEndTime - breakStartTime) : 0)) / 60);
  } else {
    return 0;
  }
}

export const timeValidationPattern: string = '^([01]?\\d|2[0-3]|24(?=:00?$)):([0-5]\\d)$';
