import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material";
import { RemoveDialogComponent } from "./remove-dialog.component";

@NgModule({
  imports: [
    MatDialogModule
  ],
  declarations: [
    RemoveDialogComponent
  ],
  entryComponents: [
    RemoveDialogComponent
  ]
})
export class RemoveDialogModule {
}
