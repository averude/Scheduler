import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdkAccordionModule } from "@angular/cdk/accordion";
import { SimpleAccordionComponent } from "./simple-accordion.component";

@NgModule({
  imports: [
    CommonModule,
    CdkAccordionModule
  ],
  declarations: [
    SimpleAccordionComponent
  ],
  exports: [
    SimpleAccordionComponent
  ]
})
export class SimpleAccordionModule {}
