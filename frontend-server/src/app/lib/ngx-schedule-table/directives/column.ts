import { ContentChild, Directive, Input, TemplateRef } from "@angular/core";
import { CellDef, HeaderCellDef } from "./cell";

abstract class BaseColumnDef {

}

@Directive({
  selector: '[beforeDateColumnDef]'
})
export class BeforeDateColumnDef extends BaseColumnDef {
  @ContentChild(HeaderCellDef, { read: TemplateRef }) headerCell;
  @ContentChild(CellDef, { read: TemplateRef }) cellDef;
}

@Directive({
  selector: '[afterDateColumnDef]'
})
export class AfterDateColumnDef extends BaseColumnDef {
  @ContentChild(HeaderCellDef, { read: TemplateRef }) headerCell;
  @ContentChild(CellDef, { read: TemplateRef }) cellDef;
}

@Directive({
  selector: '[pageableColumnDef]'
})
export class PageableColumnDef extends BaseColumnDef {
  @ContentChild(HeaderCellDef, { read: TemplateRef }) headerCell;
  @ContentChild(CellDef, { read: TemplateRef }) cellDef;

  @Input() cellContentPosition: 'TOP' | 'MIDDLE';
}
