import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AvrTopBarComponent } from "./avr-top-bar.component";
import { AuthorityDef, RoleDef, ToolBarContentDef, ToolBarItemDef, TopBarContentDef } from "./avr-top-bar-items";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AvrTopBarComponent,
    ToolBarItemDef,
    AuthorityDef,
    RoleDef,
    TopBarContentDef,
    ToolBarContentDef
  ],
  exports: [
    AvrTopBarComponent,
    ToolBarItemDef,
    AuthorityDef,
    RoleDef,
    TopBarContentDef,
    ToolBarContentDef
  ]
})
export class AvrTopBarModule {
}
