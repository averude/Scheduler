import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PatternsComponent } from './modules/admin/management/components/patterns/patterns/patterns.component';
import { PatternsModule } from './modules/admin/management/components/patterns/patterns.module';

@NgModule({
  imports: [BrowserModule, PatternsModule],
  declarations: [],
  bootstrap: [PatternsComponent]
})
export class AppModule {}
