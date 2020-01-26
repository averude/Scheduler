import { ContentChild, Directive, TemplateRef } from "@angular/core";
import { CellDef, HeaderCellDef } from "./cell";

abstract class BaseColumnDef {
  @ContentChild(HeaderCellDef, {read: TemplateRef, static: false}) headerCell;
  @ContentChild(CellDef, {read: TemplateRef, static: false}) cellDef;
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

