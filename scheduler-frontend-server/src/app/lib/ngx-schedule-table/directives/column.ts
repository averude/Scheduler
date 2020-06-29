import { ContentChild, Directive, TemplateRef } from "@angular/core";
import { CellDef, HeaderCellDef } from "./cell";

abstract class BaseColumnDef {

}

@Directive({
  selector: '[beforeDateColumnDef]'
})
export class BeforeDateColumnDef extends BaseColumnDef {
  @ContentChild(HeaderCellDef, {read: TemplateRef, static: false}) headerCell;
  @ContentChild(CellDef, {read: TemplateRef, static: false}) cellDef;
}

@Directive({
  selector: '[afterDateColumnDef]'
})
export class AfterDateColumnDef extends BaseColumnDef {
  @ContentChild(HeaderCellDef, {read: TemplateRef, static: false}) headerCell;
  @ContentChild(CellDef, {read: TemplateRef, static: false}) cellDef;
}

