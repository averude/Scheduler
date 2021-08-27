import { TableData } from "./table";

export interface FilteringStrategy {

  filter(tableData: TableData, value: string);

  clear(tableData: TableData);

}
