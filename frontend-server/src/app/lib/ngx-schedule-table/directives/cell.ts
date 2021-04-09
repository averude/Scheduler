import { Directive } from "@angular/core";

@Directive({
  selector: '[cellDef]'
})
export class CellDef {}

@Directive({
  selector: '[headerCellDef]'
})
export class HeaderCellDef {}
