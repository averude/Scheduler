import { Directive } from "@angular/core";

@Directive({
  selector: '[headerDef]'
})
export class HeaderDef {}

@Directive({
  selector: '[contentDef]'
})
export class ContentDef {}
