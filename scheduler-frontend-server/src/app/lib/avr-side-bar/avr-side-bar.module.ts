import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AvrSideBarContent, AvrSideBarItemDef } from "./avr-side-bar-item";
import { AvrSideBarComponent } from "./avr-side-bar.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AvrSideBarContent,
    AvrSideBarItemDef,
    AvrSideBarComponent
  ],
  exports: [
    AvrSideBarContent,
    AvrSideBarItemDef,
    AvrSideBarComponent
  ]
})
export class AvrSideBarModule {
}
