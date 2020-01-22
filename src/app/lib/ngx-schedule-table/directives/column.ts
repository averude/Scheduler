import { ContentChild, Directive, TemplateRef } from "@angular/core";
import { CellDef, HeaderCellDef } from "./cell";

abstract class BaseColumnDef {
  @ContentChild(HeaderCellDef, {read: TemplateRef}) headerCell;
  @ContentChild(CellDef, {read: TemplateRef}) cellDef;
}

@Directive({
  selector: '[beforeDateColumnDef]'
})
export class BeforeDateColumnDef extends BaseColumnDef {
}

@Directive({
  selector: '[afterDateColumnDef]'
})
export class AfterDateColumnDef extends BaseColumnDef {
}

