import * as moment from "moment";

export function isBetween(value: string, from: string, to: string): boolean {
  return moment(value).isBetween(moment(from), moment(to),'date', '[]');
}
