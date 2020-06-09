import { ContentChild, ContentChildren, Directive, QueryList, TemplateRef } from "@angular/core";

@Directive({
  selector: '[toolBarItemDef]'
})
export class ToolBarItemDef {
}

@Directive({
  selector: '[topBarContentDef]'
})
export class TopBarContentDef {
}

@Directive({
  selector: '[authorityDef]'
})
export class AuthorityDef {
}

@Directive({
  selector: '[roleDef]'
})
export class RoleDef {
}

@Directive({
  selector: '[toolBarContentDef]'
})
export class ToolBarContentDef {
  @ContentChild(AuthorityDef, {read: TemplateRef, static: false})
  authorityDef: TemplateRef<any>;

  @ContentChild(RoleDef, {read: TemplateRef, static: false})
  roleDef:      TemplateRef<any>;

  @ContentChildren(ToolBarItemDef, {read: TemplateRef})
  toolBarItemsDef: QueryList<TemplateRef<any>>;
}
